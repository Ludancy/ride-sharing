import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { ChoferTabla, Chofere } from '../../interfaces';
import { DialogoVerBancoComponent } from './components/dialogo-ver-banco/dialogo-ver-banco.component';
import { DialogoEvaluacionChoferComponent } from './components/dialogo-evaluacion-chofer/dialogo-evaluacion-chofer.component';
import { DialogoVehiculoChoferComponent } from './components/dialogo-vehiculo-chofer/dialogo-vehiculo-chofer.component';
import { MainPageService } from './services/main-page.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrasladoResponse } from '../../interfaces/traslado-response';
import { DialogoVerTrasladoWebComponent } from './components/dialogo-ver-traslado-webs/dialogo-ver-traslado-web.component';
import { DialogoVerContactoEmergenciaComponent } from './components/dialogo-ver-contacto-emergencia/dialogo-ver-contacto-emergencia.component';
import { Vehiculo } from '../../interfaces/vehiculo-response';
import { VehiculoTabla } from '../../interfaces/vehiculo-tabla';
import { NominatimService, NominatimPlace } from './services/nominatim.service';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  private dialog = inject(MatDialog)
  private authService = inject(AuthService)
  private MainPageService = inject(MainPageService);
  private nominatimService = inject(NominatimService);
  private fb = inject(FormBuilder);

  choferes: Chofere[] = [];
  vehiculos: Vehiculo[] = [];
  trasladoActual!: TrasladoResponse;

  isLoading = false;
  message: string = '';
  distid?: string = '';
  selectedFile?: File;
  selection = new SelectionModel<ChoferTabla>(true, []);
  selectedRows: ChoferTabla[] = [];
  showButton: boolean = false;

  // Formulario reactivo para lugares (ahora objetos)
  lugarFormulario: FormGroup = this.fb.group({
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    horaRecogida: ['12:00', [Validators.required]],
    pasajeros: [1, [Validators.required, Validators.min(1), Validators.max(6)]]
  });

  origenResultados$!: Observable<NominatimPlace[]>;
  destinoResultados$!: Observable<NominatimPlace[]>;

  // Estado del Dashboard Modernizado
  distanciaKm: number = 0;
  mostrarEstimaciones: boolean = false;
  vehiculoSeleccionado: string = 'estandar';
  
  lugaresFrecuentes = [
    {
      nombre: 'Oficina',
      tipo: 'Trabajo',
      stars: 4.9,
      icon: '🏢',
      place: {
        place_id: 9901,
        display_name: 'Torre Llanito Express, Caracas',
        lat: '10.4984',
        lon: '-66.8378'
      }
    },
    {
      nombre: 'Gimnasio',
      tipo: 'Salud',
      stars: 4.7,
      icon: '🏋️',
      place: {
        place_id: 9902,
        display_name: 'Gimnasio Llanito Fit, Caracas',
        lat: '10.4851',
        lon: '-66.8123'
      }
    },
    {
      nombre: 'Casa de Mamá',
      tipo: 'Familia',
      stars: 5.0,
      icon: '🏡',
      place: {
        place_id: 9903,
        display_name: 'Casa de Mamá (Llanito Stone, Caracas)',
        lat: '10.4900',
        lon: '-66.8250'
      }
    }
  ];

  viajesRecientes = [
    { origen: 'A: Casa', destino: 'B: Oficina', fecha: 'Hoy, 09:30 AM', costo: 4.5, estado: 'Completado' },
    { origen: 'D: Gimnasio', destino: 'A: Casa', fecha: 'Ayer, 06:15 PM', costo: 3.2, estado: 'Completado' },
    { origen: 'B: Oficina', destino: 'D: Gimnasio', fecha: '16 May, 05:00 PM', costo: 5.8, estado: 'Completado' }
  ];

  estimaciones: any[] = [];

  // Control de visibilidad de paneles laterales (Responsive Drawers)
  leftPanelVisible: boolean = true;
  rightPanelVisible: boolean = false;

  toggleLeftPanel(): void {
    this.leftPanelVisible = !this.leftPanelVisible;
  }

  toggleRightPanel(): void {
    this.rightPanelVisible = !this.rightPanelVisible;
  }

  // Chat de soporte flotante
  chatAbierto: boolean = false;
  chatMensajes: any[] = [];
  nuevoMensaje: string = '';

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'cedula', 'fecha', 'carros', 'banco', 'evaluacion', 'emergencia'];
  displayedColumns2: string[] = ['id', 'marca', 'color', 'placa', 'fecha', 'evaluacion', 'emergencia'];

  dataSource!: MatTableDataSource<ChoferTabla>;
  dataSource2!: MatTableDataSource<VehiculoTabla>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public user = computed(() => this.authService.usuarioActual());

  constructor() {}

  ngOnInit(): void {
    switch (this.user()?.rol) {
      case 1:
        this.getChoferesFromBBDD();
      break;
      case 2:
        this.setupAutocomplete();
        this.setupEstimations();
        this.inicializarChatSoporte();
      break;
      case 3:
        this.getVehiculosByIdFromChoferes();
      break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {}

  // Autocomplete setup
  setupAutocomplete() {
    this.origenResultados$ = this.lugarFormulario.get('origen')!.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(query => typeof query === 'string' && query.length > 2),
      switchMap(query => this.nominatimService.search(query))
    );

    this.destinoResultados$ = this.lugarFormulario.get('destino')!.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(query => typeof query === 'string' && query.length > 2),
      switchMap(query => this.nominatimService.search(query))
    );
  }

  displayPlace(place: NominatimPlace): string {
    return place && place.display_name ? place.display_name : '';
  }

  // Formula de Haversine para calcular distancia en km
  calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  //Si es para administradores
  getChoferesFromBBDD() {
    this.MainPageService.getChoferes().subscribe(resp => {
      this.choferes = resp.choferes
      const users = Array.from({ length: this.choferes.length }, (_, k) => this.createNewProducts(k));
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  //Si es para chofer
  getVehiculosByIdFromChoferes() {
    this.MainPageService.getVehiculosChofer(this.user()?.idUsuario!).subscribe(resp => {
      this.vehiculos = resp.chofer.vehiculos
      const users = Array.from({ length: this.vehiculos.length }, (_, k) => this.crearVehiculosChofer(k));
      this.dataSource2 = new MatTableDataSource(users);
    })
  }

  crearVehiculosChofer(i: number): VehiculoTabla {
    return {
        id: this.vehiculos[i].id,
        marca: this.vehiculos[i].marca,
        color: this.vehiculos[i].color,
        placa: this.vehiculos[i].placa,
        anio_fabricacion: this.vehiculos[i].anio_fabricacion,
    }
  }

  guardarTraslado(): void {
    if (this.lugarFormulario.invalid) {
      Swal.fire('Error', "Por favor, selecciona origen y destino válidos de la lista", 'error');
      return;
    }

    const { origen, destino } = this.lugarFormulario.value;

    if (typeof origen === 'string' || typeof destino === 'string') {
      Swal.fire('Error', "Debes seleccionar un lugar de las opciones desplegadas", 'error');
      return;
    }

    if (origen.place_id === destino.place_id) {
      Swal.fire('Error', "No se puede pedir una carrera con origen y destino iguales", 'error');
      return;
    }

    // Calcular costo según tipo seleccionado
    let costoCalculado = 2.0;
    if (this.mostrarEstimaciones && this.estimaciones.length > 0) {
      const selected = this.estimaciones.find(e => e.tipo === this.vehiculoSeleccionado);
      if (selected) {
        costoCalculado = selected.tarifa;
      }
    } else {
      const TARIFA_BASE_KM = 1.5;
      const distanciaKm = this.calcularDistancia(
        parseFloat(origen.lat), parseFloat(origen.lon),
        parseFloat(destino.lat), parseFloat(destino.lon)
      );
      costoCalculado = +(distanciaKm * TARIFA_BASE_KM).toFixed(2);
      if (costoCalculado < 2) costoCalculado = 2;
    }

    // Función para acortar la dirección de Nominatim (evitar Data too long en BD)
    const acortarDireccion = (direccionCompleta: string) => {
      if (!direccionCompleta) return '';
      // Nominatim separa por comas. Tomamos las primeras 2 partes (ej: "Avenida, Caracas")
      const partes = direccionCompleta.split(',').map(p => p.trim());
      const direccionCorta = partes.slice(0, 2).join(', ');
      
      // Asegurar que no exceda 100 caracteres por si acaso la columna de BD es pequeña
      return direccionCorta.length > 100 ? direccionCorta.substring(0, 97) + '...' : direccionCorta;
    };

    const body = {
      direccion_origen: acortarDireccion(origen.display_name),
      lat_origen: parseFloat(origen.lat),
      lng_origen: parseFloat(origen.lon),
      direccion_destino: acortarDireccion(destino.display_name),
      lat_destino: parseFloat(destino.lat),
      lng_destino: parseFloat(destino.lon),
      costo: costoCalculado
    };

    this.MainPageService.postSolictarTraslado(this.user()?.idUsuario!, body).subscribe(
      resp => {
        if (resp["message"] === "Traslado solicitado con éxito.") {
          this.MainPageService.getTraslado(this.user()?.idUsuario!).subscribe(
            historial => {
              this.trasladoActual = historial[historial.length - 1];
              this.dialog.open(DialogoVerTrasladoWebComponent, {
                data: {
                  origen: body.direccion_origen,
                  destino: body.direccion_destino,
                  traslado: this.trasladoActual
                },
              });
              this.lugarFormulario.reset();
            }
          );
        }
      },
      err => {
        Swal.fire('Error', "Hubo un error al procesar tu solicitud.", 'error');
      }
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Builds and returns a new Products. */
  createNewProducts(i: number): ChoferTabla {
    return {
      id: this.choferes[i].id,
      nombre: this.choferes[i].nombre,
      apellido: this.choferes[i].apellido,
      cedula: this.choferes[i].cedula,
      fecha_nacimiento: this.choferes[i].fechaNacimiento,
    }
  }

  /* Abre el dialogo para ver el banco*/
  openDialogBanco(element: ChoferTabla) {
    this.dialog.open(DialogoVerBancoComponent, {
      data: element.id,
    })
  }

  openDialogEvaluacionChofer(element: any) {
    this.dialog.open(DialogoEvaluacionChoferComponent, {
      data: {
        id: element.id,
        tipo: 1,
      },
    })
  }

  openDialogVehiculo(element: ChoferTabla) {
    this.dialog.open(DialogoVehiculoChoferComponent, {
      data: element.id,
    })
  }

  openDialogContactoEmergencia(element: ChoferTabla) {
    this.dialog.open(DialogoVerContactoEmergenciaComponent, {
      data: element.id,
    })
  }

  openDialogEvaluacionVehiculo(element: VehiculoTabla){
    this.dialog.open(DialogoEvaluacionChoferComponent, {
      data: {
        id: element.id,
        tipo: 2,
      },
    })
  }

  // Métodos del Dashboard Moderno
  setupEstimations(): void {
    this.lugarFormulario.valueChanges.subscribe(val => {
      const { origen, destino } = val;
      if (origen && destino && typeof origen === 'object' && typeof destino === 'object') {
        const dist = this.calcularDistancia(
          parseFloat(origen.lat), parseFloat(origen.lon),
          parseFloat(destino.lat), parseFloat(destino.lon)
        );
        this.distanciaKm = +dist.toFixed(2);
        
        // Calcular costos dinámicos
        const precioEstandar = Math.max(2.0, +(this.distanciaKm * 1.5).toFixed(2));
        const precioPremium = Math.max(5.0, +(this.distanciaKm * 3.0).toFixed(2));
        const precioVan = Math.max(4.0, +(this.distanciaKm * 2.5).toFixed(2));

        // Calcular ETAs
        const etaEstandar = Math.max(3, Math.round(5 + this.distanciaKm * 2));
        const etaPremium = Math.max(2, Math.round(3 + this.distanciaKm * 1.5));
        const etaVan = Math.max(5, Math.round(7 + this.distanciaKm * 2.5));

        this.estimaciones = [
          { tipo: 'estandar', nombre: 'Estándar', icon: 'directions_car', tarifa: precioEstandar, eta: etaEstandar, desc: 'Viaje rápido y económico' },
          { tipo: 'premium', nombre: 'Premium', icon: 'local_taxi', tarifa: precioPremium, eta: etaPremium, desc: 'Alta gama con aire y chofer top' },
          { tipo: 'van', nombre: 'Van', icon: 'airport_shuttle', tarifa: precioVan, eta: etaVan, desc: 'Espacioso, ideal para grupos' }
        ];
        this.mostrarEstimaciones = true;
        this.rightPanelVisible = true;
      } else {
        this.mostrarEstimaciones = false;
        this.estimaciones = [];
      }
    });
  }

  seleccionarDestinoFrecuente(frecuente: any): void {
    // Establecer origen GPS si no está seleccionado
    const origenActual = this.lugarFormulario.get('origen')?.value;
    if (!origenActual || typeof origenActual === 'string') {
      const gpsOrigen = {
        place_id: 8801,
        display_name: 'Localización GPS (Llanito Stone, Caracas)',
        lat: '10.4900',
        lon: '-66.8250'
      };
      this.lugarFormulario.patchValue({ origen: gpsOrigen });
    }
    
    this.lugarFormulario.patchValue({ destino: frecuente.place });
  }

  seleccionarVehiculo(tipo: string): void {
    this.vehiculoSeleccionado = tipo;
  }

  inicializarChatSoporte(): void {
    this.chatMensajes = [
      { sender: 'soporte', text: '¡Hola! Bienvenido al chat de soporte de Llanito Express. ¿En qué podemos ayudarte con tu traslado hoy?', time: '18:24' }
    ];
  }

  toggleChat(): void {
    this.chatAbierto = !this.chatAbierto;
  }

  enviarMensajeSupport(): void {
    if (!this.nuevoMensaje.trim()) return;

    this.chatMensajes.push({
      sender: 'usuario',
      text: this.nuevoMensaje,
      time: 'Ahora'
    });

    const msg = this.nuevoMensaje;
    this.nuevoMensaje = '';

    setTimeout(() => {
      let respuestaText = 'Entendido. Estamos procesando tu consulta en el sistema. Un operador humano te asistirá en unos momentos.';
      if (msg.toLowerCase().includes('hola')) {
        respuestaText = '¡Hola! Espero que estés excelente. Dime en qué te puedo colaborar hoy.';
      } else if (msg.toLowerCase().includes('precio') || msg.toLowerCase().includes('tarifa') || msg.toLowerCase().includes('costo')) {
        respuestaText = 'Nuestras tarifas se calculan automáticamente según la distancia vía GPS. ¡Puedes ver el desglose detallado en el panel derecho!';
      } else if (msg.toLowerCase().includes('gps') || msg.toLowerCase().includes('origen')) {
        respuestaText = 'Tu ubicación GPS actual está confirmada de forma segura en Llanito Express.';
      }

      this.chatMensajes.push({
        sender: 'soporte',
        text: respuestaText,
        time: 'Ahora'
      });
    }, 1200);
  }
}
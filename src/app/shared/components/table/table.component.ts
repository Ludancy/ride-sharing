import { Component, OnInit, Input, Output, EventEmitter,SimpleChanges, OnChanges} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() title:string | null = null;
  @Input() keys: string[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() data: any = [];
  @Input() configActions: any = {
    edit: false,
    view: false,
    history: false,
    hit: false,
    progress: false,
    file: false,
    delete: false,
    download: false,
  };
  @Input() keySeparators: Array<{ key: string, separador:string, suffix: string }> = [];
  // Outputs
  @Output() deleteIndexData = new EventEmitter<any>();
  @Output() editIndexData = new EventEmitter<any>();
  @Output() previewIndexData = new EventEmitter<any>();
  @Output() hitIndexData = new EventEmitter<any>();
  @Output() downloadIndexData = new EventEmitter<any>();
  @Output() progressData = new EventEmitter<any>();
  dataSource:any;

  public perm = { tabs: [], consultar: false, crear: false, modificar: false, eliminar: false };
  public tabsmod = [];

  constructor(
    private route: Router,
  ) { 
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.data = [...changes['data'].currentValue];
      this.dataSource = new MatTableDataSource<any>(this.data);
    }
  }

  deleteData(index:number):void {
    console.log(index)
    this.deleteIndexData.emit(index);
  }

  editData(index: number):void {
    this.editIndexData.emit(index);
  }

  previewData(index: number):void {
    this.previewIndexData.emit(index);
  }

}

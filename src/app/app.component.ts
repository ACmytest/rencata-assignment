import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DataTableResource } from 'angular-4-data-table-bootstrap-4';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular 4 CRUD Example Using Bootstrap Datatable';
  userForm: FormGroup;
  @ViewChild('modalClose') modalClose:ElementRef;





  /////////////////////////////////Static data, you can change as per your need
  persons: any[] = [ 
	    { "name": "Vijay","id": "01", "address": " 20 Anna Salai, chennai","role": "UIDeveloper","department":"Front End","skillSet":"Angular","Aactions":"active"},
	    { "name": "Kumar","id": "02", "address": "Banglore","role": "Angular Developer","department":"Front End","skillSet":"Angular","Aactions":"active"},
	    { "name": "John","id": "03", "address": "Mumbi","role": "JavaDeveloper","department":"Java","skillSet":"Angular","Aactions":"active"},
	    { "name": "APJ","id": "04", "address": "Tamil Nadu","role": "Scientist","department":"space","skillSet":"Angular","Aactions":"active"},

  ];
  


	itemResource = new DataTableResource(this.persons);
	items = [];
	itemCount = 0;
	params = {offset: 0, limit: 10}; //Static can be changed as per your need
	formFlag = 'add';

    constructor(){
      this.itemResource.count().then(count => this.itemCount = count);
      this.reloadItems(this.params);
    }  

    reloadItems(params) {
      this.itemResource.query(params).then(items => this.items = items);
    }





    ////////////////// special properties:
    rowClick(rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.name);
    }

    rowDoubleClick(rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.name);
    }

	rowTooltip(item) { return item.jobTitle; }





	////////////////Init method
	ngOnInit(){
		this.userForm = new FormGroup({
		  'id': new FormControl(null),
		  'name': new FormControl(null, Validators.required),
		  'jobTitle': new FormControl(null, Validators.required)
		});
	}



	initUser(){
	 //User form reset
		this.userForm.reset();
		this.formFlag = 'add';
  }





  
	/////////////////////////Save user's data
	saveUser(){
		if(this.formFlag == 'add')
		{
			this.userForm.value.id= this.persons.length + 1;
			this.persons.unshift(this.userForm.value);
		}
		else
		{
			var index = this.persons.findIndex(x => x.id== this.userForm.value.id);
			if (index !== -1) {
			  this.persons[index] = this.userForm.value;
			}
		}
		this.reloadTableManually();
		//Close modal
		this.modalClose.nativeElement.click();
		//User form reset
		this.userForm.reset();
  }
  



	////////////////////Get data while edit
	getData(item)
	{
		this.userForm.patchValue(item);
		this.formFlag = 'edit';
  }
  



	///////////////////////Delete user's data
	delData(item){
		this.persons.splice(this.persons.indexOf(item), 1);
		this.reloadTableManually();
  }
  



	//////////////////////Reload table manually after add/edit
	reloadTableManually(){
		this.reloadItems(this.params);
		this.itemResource.count().then(count => this.itemCount = count);
	}
}

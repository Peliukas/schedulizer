import PouchDB from 'pouchdb';

export class Employee {

  // private _id: any;
  // private firstname: string;
  // private lastname: string;
  // private position_id: any;

  data: {
    _id: "",
    firstname: "",
    lastname: "",
    position_id: ""
  };

  db: any;

  constructor(_id: any, firstname: any, lastname: any, position_id: any ) {
    this.data._id = _id;
    this.data.firstname = firstname;
    this.data.lastname = lastname;
    this.data.position_id = position_id;
    this.db = new PouchDB('Employees')
  }

  public setID(id: any) {
    this.data._id = id;
  }

  public setFirstName(firstname: any) {
    this.data.firstname = firstname;
  }

  public setFLastName(lastname: any) {
    this.data.lastname = lastname;
  }

  public setPositionId(position_id: any) {
    this.data.position_id = position_id;
  }

  public getID(id: any) {
    return this.data._id;
  }

  public getFirstName(firstname: any) {
    return this.data.firstname;
  }

  public getFLastName(lastname: any) {
    return this.data.lastname;
  }

  public getPositionId(position_id: any) {
    return this.data.position_id;
  }

  public getWorkingDays(){

  }

  public save(){
      this.db.put(this.data);
      return "object saved!";
  }

  public delete(){
      this.db.delete(this.data);
      return "object deleted!";
  }

  public find(id: any){
    this.db.get(id)
      .subscribe(data => {
        return data;
      });
  }

  public findAll(){
    this.db.allDocs()
      .subscribe(data => {
        return data;
      });
  }


}

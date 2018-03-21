import PouchDB from 'pouchdb';

export class Schedule {

  data: any;
  db: any;

  constructor() {
    this.data = {
      _id: "",
      schedule_name: "",
      schedule_description: "",
      work_days: []
    };
    this.db = new PouchDB('Schedules');
  }

  public setValues(data: any){
    this.data._id = data._id;
    this.data.schedule_name= data.schedule_name;
    this.data.schedule_description = data.schedule_description;
    this.data.work_days = data.work_days;
  }


  public save(){
    try{
      this.db.get(this.data._id).then(doc =>{
        this.data._rev = doc._rev;
        this.db.put(this.data);
        console.log('schedule saved!');
      }, cause =>{
        if(cause.status === 404){
          console.log('creating new schedule');
          this.db.put(this.data);
        }
      });
      return true;
    }catch(e){
      console.log(e);
      return false;
    }
  }

  public setWorkDays(workDays: any){
    this.data.work_days = workDays;
  }


  public delete(){
    this.db.get(this.data._id).then(doc => {
      doc._deleted = true;
      return this.db.put(doc);
    }, reason =>{
      return reason;
    });
  }

  public async find(id: any){
    this.db.get(id)
      .then(schedule => {
        this.data = schedule;
      });
    return this.db.get(id);
  }

  public findAll(){
    return this.db.allDocs(({include_docs: true}));
  }




}

import PouchDB from 'pouchdb';

export class Schedule {

  data: any;
  db: any;

  constructor() {
    this.data = {
      _id: "",
      schedule_name: "",
        work_hours_cap: "",
        is_private: false,
      work_days: []
    };
    this.db = new PouchDB('Schedules');
  }

  public setValues(data: any){
    this.data._id = data._id;
    this.data.schedule_name= data.schedule_name;
    this.data.work_days = data.work_days;
      this.data.is_private = data.is_private;
      this.data.work_hours_cap = data.work_hours_cap;
  }


  public save(){
    try{
      this.db.get(this.data._id).then(doc =>{
        this.data._rev = doc._rev;
        this.db.put(this.data);
      }, cause =>{
        if(cause.status === 404){
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

    // public async findPrivateSchedule(scheduleId: any){
    //     this.findAll()
    //         .then(data => {
    //             for(let schedule of data.rows){
    //                 if(schedule.doc.is_private && schedule.id === scheduleId){
    //                     return schedule;
    //                 }
    //             }
    //         });
    //
    // }




}

import PouchDB from 'pouchdb';

export class WorkDay {

  data: any;
  db: any;

  constructor() {
    this.data = {
      _id: "",
      start_time: "",
      end_time: "",
      date: "",
      breaks: []
    };
    this.db = new PouchDB('WorkDays');
  }

  public setValues(data: any){
    this.data.start_time= data.start_time;
    this.data.end_time = data.end_time;
    this.data.date = data.date;
    this.data.breaks = data.breaks;
    return true;
  }


  public save(){
    try{
     if(!this.data._id && this.data.date && this.data.start_time && this.data.end_time){
       let generatedID = this.generateUniqueID();
       this.db.put(this.data);
     }
      this.db.get(this.data._id).then(doc =>{
        this.data._rev = doc._rev;
        this.db.put(this.data);
      }, cause =>{
        console.log('creating new work day...');
        this.db.put(this.data);
      });
      console.log('work day saved!');
      return true
    }catch(e){
      console.log(e);
      return false;
    }
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
      .then(workDay => {
        this.data = workDay;
      });
    return this.db.get(id);
  }

  public findAll(){
    return this.db.allDocs(({include_docs: true}));
  }

  public generateUniqueID() {
    console.log(this.findAll()[0].id);
    if (this.findAll()[0].id) {
      return this.findAll()[0].id++;
    } else return 0;
  }

  public addBreak(breakStart: any, breakEnd: any){
    this.data.breaks.push({breakStart: breakStart, breakEnd: breakEnd});
  }

  public removeBreak(index: number){
    this.data.break.splice(index, 1);
  }
}

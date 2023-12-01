import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Form from "./fields/form"
import Tables from "./fields/table"
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_JWT = "Basic MTk3YWNiNmNkNjQwOGU3OjYwYjNhZWQ2ZmU0YWZkZg=="
	private REST_API_SERVER = "https://admin-jointec.tecsup.edu.pe/api/method/bdalumni.api.docField?docname=Perfil%20del%20exalumno";
  private REST_API_PATH = "https://admin-jointec.tecsup.edu.pe/api/method/bdalumni.api.docField?docname=";
  private REST_API_TABLE = "https://admin-jointec.tecsup.edu.pe/api/method/bdalumni.api.docTable?docname=";
  private REST_API_SEARCH = "https://admin-jointec.tecsup.edu.pe/api/method/bdalumni.api.search?docname=";
  private REST_API_RESURCE = "https://admin-jointec.tecsup.edu.pe/api/resource/";
  private REST_API_METHOD = "https://admin-jointec.tecsup.edu.pe/api/method/";
  public static ENV_VARS:{UserData:object|null,headerToken:string} = {
    UserData:null,
    headerToken:""
  };

  AddSection={
    name: "t001",
    creation: "2022-06-24 11:15:19.263955",
    modified: "2022-07-15 12:48:38.570107",
    modified_by: "Administrator",
    owner: "Administrator",
    docstatus: 0,
    parent: "Perfil del exalumno",
    parentfield: "fields",
    parenttype: "DocType",
    idx: 1,
    fieldname: "temporal",
    label: "",
    oldfieldname: null,
    fieldtype: "Section Break",
    oldfieldtype: null,
    options: null,
    search_index: 0,
    hidden: 0,
    set_only_once: 0,
    allow_in_quick_entry: 0,
    print_hide: 0,
    report_hide: 0,
    reqd: 0,
    bold: 0,
    in_global_search: 0,
    collapsible: 0,
    unique: 0,
    no_copy: 0,
    allow_on_submit: 0,
    show_preview_popup: 0,
    trigger: null,
    collapsible_depends_on: null,
    mandatory_depends_on: null,
    read_only_depends_on: null,
    depends_on: null,
    permlevel: 0,
    ignore_user_permissions: 0,
    width: null,
    print_width: null,
    columns: 0,
    default: null,
    description: null,
    in_list_view: 0,
    fetch_if_empty: 0,
    in_filter: 0,
    remember_last_selected_value: 0,
    ignore_xss_filter: 0,
    print_hide_if_no_value: 0,
    allow_bulk_edit: 0,
    in_standard_filter: 0,
    in_preview: 0,
    read_only: 0,
    precision: "",
    length: 0,
    translatable: 0,
    hide_border: 0,
    hide_days: 0,
    hide_seconds: 0,
    non_negative: 0,
    fetch_from: null,
  }
  constructor(private httpClient: HttpClient) {

  }
  public renderDoc(resp:object, arrays:object ):{docname:string,fields:object,tables:object|null,JsonPost:object}{
        let response:{docname:string,fields:object,tables:object|null,JsonPost:object}={docname:"",fields:{},tables:{},JsonPost:{}}
        let doc_name=""

        if(resp["name"]){
          doc_name = resp["name"]
        }
        for(let key in resp){
            if(Array.isArray(resp[key])===false){
                let el:any = document.getElementById(key)
                if(el !==null){
                    if(el.nodeName==="INPUT" || el.nodeName === "SELECT"){
                      el.value = resp[key]
                    }
                }
                response.fields[key] = resp[key]
            }else{
              let tables:object = this.addTablesData( key,resp[key] ,arrays)

              response.tables[key] = tables["Table"]
              response.JsonPost[key]= tables["Json"]
            }
        }
        response.docname = doc_name
        return response
  }
  private addTablesData(fieldname, table,arrays):{Table:[any]|[],Json:object}{
    var tabledata = arrays[fieldname]
    var tablesData:[any]|[] = []
    let kvpairs:[any]|[] = [];
    let kvpairs2 = [];
    let tableform={};
    let jsonPostData=table
    for ( var r = 0; r < table.length; r++ ) {
      var row = table[r];
      kvpairs=[]
      for ( var i = 0; i < tabledata.length; i++ ) {
        var e = tabledata[i];
        let kv:object={fieldname:e.fieldname ,name:row[e.fieldname], req:e.reqd, in_list_view:e.in_list_view };
        tableform[e.fieldname]=row[e.fieldname];
        kvpairs.push(kv as never);
      }
      for ( var fieldkey  in row) {
        var fieldtable = row[fieldkey];
        if(tableform[fieldkey]===undefined){
          let kv:object={fieldname:fieldkey ,name:fieldtable, req:0, in_list_view:"0" };
          kvpairs.push(kv as never);
        }
      }
      if(tablesData=== undefined ){
        tablesData = []
      }
      tablesData.push(kvpairs as never)
    }
    return {Table:tablesData,Json:jsonPostData};
  }
  public renderTableData(tablename:string, temp1:[any]):void{
    setTimeout(() => {

      var fieldtables:object={};
      for(var i =0;i< temp1.length;i++){
        fieldtables[temp1[i].fieldname] = temp1[i].name
      }
      (document.getElementById(`table_row_name`) as HTMLInputElement).value = fieldtables["name"];
      (document.getElementById(`table_row_idx`) as HTMLInputElement).value = fieldtables["idx"];
      for(var key in fieldtables){
          if(document.querySelector(`#table_${tablename} #${key}`)!==null){
            ( document.querySelector(`#table_${tablename} #${key}`) as HTMLInputElement).value = fieldtables[key];
          }
      }
    }, 300);

  }

  public get_idx_table( temp1:[any]):number{

      var fieldtables:object={};
      for(var i =0;i< temp1.length;i++){
        fieldtables[temp1[i].fieldname] = temp1[i].name
      }
      return (fieldtables["idx"] as number);

  }
  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }
  public getFields(docname){
    return this.httpClient.get(this.REST_API_PATH+docname);
  }
  public getLocalFields(docname){
    return Form[docname];
  }
  public getLocalTables(docname){
    return Tables[docname];
  }
  public getTables(docname){
    return this.httpClient.get(this.REST_API_TABLE+docname);
  }
  public getSearch(docname:String,search_value:String){
    return this.httpClient.get(this.REST_API_SEARCH+docname+"&searchvalue="+search_value);
  }
  public getDocFiles(doctype:string,docname:string):Observable<any>{
    const cabecera:HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.REST_JWT
    });
    const rest_url =`${this.REST_API_RESURCE}File?fields=["*"]&filters=[["attached_to_name","=","${docname}"],["attached_to_doctype","=","${doctype}"]]`
    return this.httpClient.get(rest_url,{headers:cabecera});
  }
  public UploadFile(
      file:{
        file_obj:File,name:string,private:number,file_url:string|boolean
      },
      folder:string = "/",
      doctype:string = "none",
      docname:string = "none",
      method:string = "none"
    ){

      const cabecera:HttpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': this.REST_JWT
      });
      let form_data:FormData = new FormData();
      if (file.file_obj) {
        form_data.append('file', file.file_obj, file.name);
      }
      form_data.append('is_private',  ( file.private.toString()) );
      form_data.append('folder', folder);
      if (file.file_url) {
        form_data.append('file_url', (file.file_url).toString() );
      }
      if (doctype!=="none" && docname!=="none") {
        form_data.append('doctype', doctype);
        form_data.append('docname', docname);
      }
      if (method!=="none") {
        form_data.append('method', method);
      }

    return this.httpClient.post(`${this.REST_API_METHOD}upload_file`,form_data,{headers:cabecera});
  }
  public getListData(docname,docFields){
    const cabecera:HttpHeaders = new HttpHeaders({
      'Authorization': this.REST_JWT
    });
    let fields:[String] = ["name"];
    for (const key in docFields) {
        const element = docFields[key];
        fields.push(element.fieldname)
    }
    return this.httpClient.get(`${this.REST_API_RESURCE}${docname}?fields=${JSON.stringify(fields)}`,{headers:cabecera});
  }
  public get_doc(doctype,docname){
    const cabecera:HttpHeaders = new HttpHeaders({
      'Authorization': this.REST_JWT
    });
    return this.httpClient.get(`${this.REST_API_RESURCE}${doctype}/${docname}`,{headers:cabecera});
  }
  public save_doc(doctype,doc){
    const cabecera:HttpHeaders = new HttpHeaders({
      'Authorization': this.REST_JWT
    });
    return this.httpClient.put<any>(`${this.REST_API_RESURCE}${doctype}/${doc.name}`,doc,{headers:cabecera});
  }
  public insert_doc(doctype,doc){
    const cabecera:HttpHeaders = new HttpHeaders({
      'Authorization': this.REST_JWT
    });
    return this.httpClient.post(`${this.REST_API_RESURCE}${doctype}`,doc,{headers:cabecera});
  }
  public delete_doc(doctype,name?){
    const cabecera:HttpHeaders = new HttpHeaders({
      'Authorization': this.REST_JWT
    });
    if(name===undefined){
    return this.httpClient.delete(`${this.REST_API_RESURCE}${doctype}`,{headers:cabecera});
    }else{
      return this.httpClient.delete(`${this.REST_API_RESURCE}${doctype}/${name}`,{headers:cabecera});

    }
  }
  public get_list(doctype,fields,filters?){
    const cabecera:HttpHeaders = new HttpHeaders({
      'Authorization': this.REST_JWT
    });
    if(filters===undefined){

      return this.httpClient.get(`${this.REST_API_RESURCE}${doctype}?fields=${JSON.stringify(fields)}&limit=200`,{headers:cabecera});
    }else{
      return this.httpClient.get(`${this.REST_API_RESURCE}${doctype}?fields=${JSON.stringify(fields)}&filters=${JSON.stringify(filters)}&limit=200`,{headers:cabecera});

    }
  }
  public get_list_order(doctype,fields,filters?){
    const cabecera:HttpHeaders = new HttpHeaders({
      'Authorization': this.REST_JWT
    });
    if(filters===undefined){

      return this.httpClient.get(`${this.REST_API_RESURCE}${doctype}?fields=${JSON.stringify(fields)}&order_by=modified desc&limit=200`,{headers:cabecera});
    }else{
      return this.httpClient.get(`${this.REST_API_RESURCE}${doctype}?fields=${JSON.stringify(fields)}&filters=${JSON.stringify(filters)}&order_by=modified desc&limit=200`,{headers:cabecera});

    }
  }
  public get_list_name_limit(doctype,fields,limit){
    const cabecera:HttpHeaders = new HttpHeaders({
      'Authorization': this.REST_JWT
    });
      return this.httpClient.get(`${this.REST_API_RESURCE}${doctype}?fields=${JSON.stringify(fields)}&limit=${limit}&limit=200`,{headers:cabecera});

  }


}

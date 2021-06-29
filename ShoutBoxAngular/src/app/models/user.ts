export class User {
   
        id : string ;
        userName : string ;
        dob : string;
        mobileNo : string;
       userEmail : string;
        userPass : string;
        userProfile : string;
        friends : string;
        workingAt : string;
        address : string;
        role:string;
        created_at:any;
        updated_at:any;

    constructor(){
        this.id = "";
        this.userName = "";
        this.dob = "";
        this.mobileNo = "";
        this.userEmail = "";
        this.userPass = "";
        this.userProfile = "";
        this.role="";
        this.friends = "";
        this.workingAt = "";
        this.address = "";
        this.created_at="";
        this.updated_at="";
    }
}

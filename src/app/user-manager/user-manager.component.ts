import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../service/authentication.service';
@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  users: any[] = [];
  usersTemp: any[] = [];
  previous: any = [];
  headElements: any = ['#', 'Full name', 'User name', 'Roles', 'Action']
  config = {
    id: 'list_user',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  dict = {};
  selectedUser: any;
  formEdit: FormGroup;
  formAdd: FormGroup;
  idUser: any;
  roleName: any;
  roles = [];
  data = [];
  message: string;
  submited = false;
  roleSelected: Array<string> = [];
  roleEditSelected: Array<string> = [];
  constructor(private authenticationService: AuthenticationService,
    public userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastrService) {
  }
  ngOnInit() {
    this.authenticationService.userCurrent()
    this.loadUser(this.config.currentPage - 1, this.config.itemsPerPage);
    this.initFormAdd();
    this.initFormEdit();
    this.setUpForm();
  }
  // initialize form 
  initFormAdd() {
    this.formAdd = this.fb.group({
      id: [''],
      fullname: ['', Validators.required],
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+$')
      ])],
      roleAddPreferences: this.addRole()
    });
  }
  // initialize form 
  initFormEdit() {
    this.formEdit = this.fb.group({
      id: [''],
      fullname: ['', Validators.required],
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+$')
      ])],
      roleEditPreferences: this.addRole()
    });
  }
  // get roles from sever => add to our checkbox 
  async setUpForm() {
    await this.userService.getIdroles().subscribe(res => {

      this.roleName = res;
      this.roleName.forEach(element => {
        var obj = { item_id: element.id, item_text: element.rolename };
        this.roles.push(obj);
      });
      this.initFormAdd();
    });
  }
  addRole() {
    const arr = this.roles.map(element => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }
  /** get All user */
  loadUser(page, limit) {
    this.userService.getUserByPage(page, limit).subscribe(data => {
      this.config.totalItems = data.totalElements;
      this.users = data.content;
      this.users.forEach((item, index) => {
        var list = [];
        item.roles.forEach((item, index) => {
          list.push(item.rolename);
        })
        this.users[index].roles = list.join(", ");
      });
      this.usersTemp = data;
    });
  }

  // get user id to delete
  deleteUser(iModal, id) {
    iModal.show();
    this.idUser = id;
  }
  deleteOnServer(iModal) {
    this.userService.deleteUser(this.idUser).subscribe(data => {
      this.users = this.users.filter(e => e.id !== this.idUser);
      this.toastService.success("<h5>Delete successfully!!!<h5>", "Notification");
    });
    iModal.hide();
  }

  addUser(iModal) {
    this.submited = true;
    
    if ((!this.formAdd.invalid) && this.isValidFormAddArray()) {
  
      let sendObject: any = this.formAdd.value;
      let sendRoles: any = [];
      this.roleSelected.forEach((item) => {
        sendRoles.push({ id: item });
      });
      // delete default form array
      delete sendObject.roleAddPreferences;
      // adding roles for backend formModel
      sendObject.roles = sendRoles;
      // console.log(sendObject);
      this.userService.createUser(sendObject).subscribe(
        res => {
          
          this.toastService.success("<h5>Adding successfully!!!<h5>", "Notification");
          sendObject = this.convertRoleTostr(sendObject);
          sendObject.id = res.id;
          this.users.push(sendObject);
          iModal.hide();
          this.formAdd.reset();
          this.submited = false;
        });
    }
  }
  hide(modal, form: FormGroup) {
    modal.hide();
    this.resetForm(form);
    this.submited = false;
  }
  // show modal edit user
  edit(iModal, id): void {
    const selectUser: any = this.users.filter((item) => item.id === id);
    this.formEdit = this.fb.group({
      id: [id],
      fullname: [selectUser[0].fullname, Validators.required],
      username: [selectUser[0].username, Validators.required],
      password: [selectUser[0].password, Validators.required],
      roleEditPreferences: this.getEditRoles(selectUser[0].roles)
    });
    this.getSelectedEditRole();
    iModal.show();
  }
  // function to set checked on checkbox 
  getEditRoles(rolesOfUser: any) {
    rolesOfUser = rolesOfUser.split(',');
    const arr = this.roles.map(element => {
      for (const key in rolesOfUser) {
        if (rolesOfUser[key].trim() === element.item_text) {
          console.log('true');
          return this.fb.control(true);
        }
      }
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }

  /**
   * Edit user and replace that if edit success 
   * @param iModal : Edit modal that need to hide after we edit 
   */
  editUser(iModal) {
    this.submited = true;
    if (!this.formEdit.invalid && this.isValidFormEditArray()) {
      
      let sendObject = this.formEdit.value;
      let sendRoles: any = [];
      this.roleEditSelected.forEach((item) => {
        sendRoles.push({ id: item });
      });
      // delete default form array
      delete sendObject.roleEditPreferences;
      // adding roles for backend formModel
      sendObject.roles = sendRoles;
      console.log('saved');
      console.log(sendObject);

      this.userService.updateUser(sendObject.id, sendObject).subscribe(
        res => {
          sendObject = this.convertRoleTostr(sendObject);
          const index = this.users.findIndex(e => e.id === sendObject.id);
          this.users[index] = sendObject;
          this.submited = false;
        });
      iModal.hide();
      this.toastService.success("<h5>Update successfully!!!<h5>", "Notification");
    }
  }

  resetForm(form: FormGroup) {
    form.reset();
  }


  // Offline search because list user is short , we just got all and search
  // doSearch(event) {

  //   let searchStr = event.target.value;
  //   if (!searchStr.trim()) {
  //     this.users = this.usersTemp;
  //     this.message = null;
  //     return;
  //   }
  //   let listUsersSearched: User[] = [];
  //   this.users.forEach((item, i) => {
  //     if (item.fullname.includes(searchStr) ||
  //       item.username.includes(searchStr) ||
  //       item.roles.includes(searchStr)) {
  //       listUsersSearched.push(item);
  //     }
  //   });
  //   if (listUsersSearched.length !== 0) {
  //     this.users = listUsersSearched;
  //     this.message = listUsersSearched.length + ' User found';
  //   } else {
  //     this.message = listUsersSearched.length + ' User found - Show all user';
  //   }
  // }
  // Event for ngx-pagination
  pageChange(event) {
    this.config.currentPage = event;
    this.loadUser(this.config.currentPage - 1, this.config.itemsPerPage);
  }
  add_validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'pattern', message: 'Special characters are not accepted' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' },
      { type: 'pattern', message: 'Special characters are not accepted' }
    ],
    'fullname': [
      { type: 'required', message: 'Full name is required' }
    ],
    'roles': [
      { type: 'required', message: 'Roles are required' }
    ],
  }
  // valid roles in form add
  isValidFormAddArray() {
    for (var i = 0; i < this.roleAddArray.controls.length; i++) {
      if (this.getAddValidity().controls[i].value === true) {
        return true;
      }
    }
    return false;
  }
  // valid roles in form add
  isValidFormEditArray() {
    for (var i = 0; i < this.roleEditArray.controls.length; i++) {
      if (this.getEditValidity().controls[i].value === true) {
        return true;
      }
    }
    return false;
  }


  // change event of checkbox
  getSelectedAddRole() {
    this.roleSelected = [];
    this.roleAddArray.controls.forEach((item, i) => {
      if (item.value) {
        this.roleSelected.push(this.roles[i].item_id);
      }
    });
  }

  getSelectedEditRole() {
    this.roleEditSelected = [];
    this.roleEditArray.controls.forEach((item, i) => {
      if (item.value) {
        this.roleEditSelected.push(this.roles[i].item_id);
      }
    });
  }

  public get roleAddArray() {
    return <FormArray>this.formAdd.get('roleAddPreferences');
  }


  public get roleEditArray() {
    return <FormArray>this.formEdit.get('roleEditPreferences');
  }

  getAddValidity() {
    return (<FormArray>this.formAdd.get('roleAddPreferences'));
  }
  getEditValidity() {
    return (<FormArray>this.formEdit.get('roleEditPreferences'));
  }

  // convert the roles id to roles name 
  convertRoleTostr(sendObject: any): any {
    let _NewRole: any = sendObject.roles;
    let rolesStr: string = '';
    this.roles.forEach((item, index) => {
      _NewRole.forEach((role) => {
        if (role.id === item.item_id) {
          rolesStr += item.item_text + ',';
        }
      });
    });
    rolesStr = rolesStr.substring(0, rolesStr.length - 1);
    sendObject.roles = rolesStr;
    return sendObject;
  }
  // reset add form when click on add button to show modal
  resetFormAdd() {
    this.getSelectedAddRole();
  }

}


import { Component, OnInit, ViewChild } from '@angular/core';
import { IntervieweeService } from '../service/interviewee.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { ListIntervieweeComponent } from '../list-interviewee/list-interviewee.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Status } from '../constant/Status';
import { AuthenticationService } from "../service/authentication.service";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(SearchComponent) private searchComponent: SearchComponent;
  @ViewChild(ListIntervieweeComponent) private listInterviewee: ListIntervieweeComponent;
  searchParam: any = '';
  statusSelected: Array<string> = [];
  posSelected: Array<string> = [];
  dateFrom: string = '';
  dateTo: string = '';
  positionList: Array<any> = [];
  statusList = [];
  selectedItems = [];
  dropdownSettings = {};
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  filterData: object;
  formFilter: FormGroup;
  constructor(private intervieweeService: IntervieweeService,
    private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // setTimeout(() => {
    //   localStorage.clear();
    // }, 10000)
    this.route.queryParams.subscribe(params => {
      if (params.search) {
        this.searchParam = params.search;
        // console.log('get param');
      } else {
        this.searchParam = '';
        // console.log('no param');
      }
    });
    //this.initData();
    this.initFilterData();

  }

  //----------------------------------- Initialize ---------------------------------------------
  async initFilterData() {
    Object.keys(Status).filter(k => typeof Status[k as any] === "string").forEach((value, index) => {
      //console.log(index + " -> " + value);
      this.statusList.push({ item_id: index + 1, item_text: value.replace("_", " ") })
    });;

    await this.intervieweeService.getPositionList().subscribe(
      (res) => {
        res.forEach(element => {
          this.positionList.push({ item_id: element.id, item_text: element.name });
        });
        
        this.initForm();
      }
    );
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'Check all',
      unSelectAllText: 'Uncheck all',
      closeDropDownOnSelection: false,
      itemsShowLimit: 2,
      maxHeight: 197,
      allowSearchFilter: false
    };
  }
  // form setup 
  initForm() {
    this.formFilter = this.formBuilder.group({
      posPreferences: this.addPosControl(),
      statusPreferences: this.addStatusControl(),
      dateRange: '',
      dateShow: [{ value: '', disabled: true }],
      mutilPos: '',
      mutilStatus: ''
    });
    this.onDateChanges();
  }
  addPosControl() {
    const arr = this.positionList.map(element => {
      // default false unchecked all
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }
  addStatusControl() {
    const arr = this.statusList.map(element => {
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }
  // date Range data  change 
  onDateChanges(): void {
    this.formFilter.get('dateRange').valueChanges.subscribe(val => {
      if (val) {
        this.frmDateShow.setValue(val);
        if (val.length > 10 && val !== 'undefined') {
          let date = val.split('to');
          this.dateFrom = this.formatDate(date[0]);
          this.dateTo = this.formatDate(date[1]);
        } else {
          this.dateFrom = this.formatDate(val);
        }
      }
    });
  }
  // -----------------------------------End Initialize --------------------------------------------
  //----------------------------------- form submit ---------------------------------------------

  /**
   * should set the array object to put inside the router
   * check is null or not define 
   * remove on url if it null or not define 
   * replace if that change 
   */
  doFilter() {
    console.log('PC');
    console.log(this.dateTo);

    let status = (typeof this.statusSelected.length !== 'undefined') && (this.statusSelected.length > 0) ? { status: this.statusSelected } : null;
    let position = (typeof this.posSelected.length !== 'undefined') && (this.posSelected.length > 0) ? { position: this.posSelected } : null;
    let dateFrom = (this.dateFrom.length > 0) ? { from: this.unixtimestamp(this.dateFrom) / 1000 } : null;
    let dateTo = (this.dateTo.length > 0) ? { to: this.unixtimestamp(this.dateTo) / 1000 } : null;

    console.log(dateFrom);

    console.log(status + ' and ' + position);
    let _queryParam: any;
    // retrive all data 
    _queryParam = status || position || dateFrom || dateTo ? { ...status, ...position, ...dateFrom, ...dateTo } :
      { status: null, position: null, dateFrom: null, dateTo: null };

    // some operator to remove null 
    _queryParam = !status ? { ..._queryParam, ...{ status: null } } : { ...status, ...position, ...dateFrom, ...dateTo };
    _queryParam = !position ? { ..._queryParam, ...{ position: null } } : { ...status, ...position, ...dateFrom, ...dateTo };
    _queryParam = !dateFrom ? { ..._queryParam, ...{ from: null } } : { ...status, ...position, ...dateFrom, ...dateTo };
    _queryParam = !dateTo ? { ..._queryParam, ...{ to: null } } : { ...status, ...position, ...dateFrom, ...dateTo };

    if (_queryParam.status) {
      _queryParam.status.forEach((value, index) => {
        _queryParam.status[index] = value.replace(" ", "_");
      });
    }
    console.log('My Query ' + JSON.stringify(_queryParam.status));

    if (this.searchParam) {
      console.log('got a param :' + this.searchParam);
      _queryParam = { ..._queryParam, ... { search: this.searchParam } };
      console.log('query inside' + JSON.stringify(_queryParam));
      this.router.navigate([], { queryParams: _queryParam });
    } else {
      console.log('No more param goted');
      this.router.navigate([], { queryParams: _queryParam });
    }
  }
  // ---------------------------------- End form submit ---------------------------------------------------


  //------------------------------------- Util ------------------------------------------------
  // swipe right actions
  swipe(action: string = this.SWIPE_ACTION.RIGHT) {
    console.log(action);
    if (action === this.SWIPE_ACTION.RIGHT) {
    }
  }

  formatDate(date) {
    return date.split("-").reverse().join("/").trim().replace(' ', '');
  }

  removeDateValue() {
    this.dateFrom = '';
    this.dateTo = '';
    this.frmDateShow.reset();
  }

  unixtimestamp(time): number {

    // reverse datetime to m/d/y
    let timeRevert = time.split('/');
    let temp = timeRevert[0];
    timeRevert[0] = timeRevert[1];
    timeRevert[1] = temp;
    timeRevert = timeRevert.join('/');
    console.log(timeRevert);

    return (new Date(timeRevert)).getTime();
  }

  //----------------------------------- Checkbox event  ---------------------------------------------
  // get Select pos -> provide on change event of checkbox
  getSelectedPos() {
    this.posSelected = [];
    this.posArray.controls.forEach((item, i) => {
      if (item.value) {
        this.posSelected.push(this.positionList[i].item_id);
      }
    });
  }

  // get Select status -> provide on change event of checkbox
  getSelectedStatus() {
    this.statusSelected = [];
    this.statusArray.controls.forEach((item, i) => {
      if (item.value) {
        this.statusSelected.push(this.statusList[i].item_text);
      }
    });
  }

  public get posArray() {
    return <FormArray>this.formFilter.get('posPreferences');
  }

  public get statusArray() {
    return <FormArray>this.formFilter.get('statusPreferences');
  }

  public get frmDate() {
    return this.formFilter.controls.dateRange;
  }
  public get frmDateShow() {
    return this.formFilter.controls.dateShow;
  }
  //-----------------------------------End Checkbox event ---------------------------------------------


}

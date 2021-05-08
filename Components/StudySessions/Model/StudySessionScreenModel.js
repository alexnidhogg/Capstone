import firestore from '@react-native-firebase/firestore'
import auth from "@react-native-firebase/auth";
import * as DateFix from "../../DateFix/DateFix";

class model {

  courses;
  studySessions;
  courseLinks;
  studySessionsDisplay;

  updateCourses;
  UpdateStudySessions;
  updateCourseLinks;

  refresh;

  updateDisplay;

  constructor() {

    this.courses = [];
    this.studySessions = [];
    this.courseLinks = [];
    this.studySessionsDisplay = [];

    this.updateCourseLinks = true;
    this.updateStudySessions = false;
    this.updateCourses = false;

    this.refresh = 0;

    this.updateDisplay = false;
  }

  SetRefresh(func) {
    this.refresh = func
  }

  Load(refresh) {

    //console.log("this.updateCourses ", this.updateCourses, " this.updateStudySessions ", this.updateStudySessions, " this.updateCourseLinks ", this.updateCourseLinks)

    if(this.updateCourseLinks) {
      this.updateCourseLinks = false;
      firestore().collection('CourseMembership').where('UserID', '==', auth().currentUser.uid).get().then(
        (values) => {
          this.courseLinks = []
          if(values.docs.length > 0)
          {
            for (let i = 0; i < values.docs.length; i++){
              this.courseLinks[i] = values.docs[i].get('CourseID')
            }
          }
          this.updateCourses = true;
          this.refresh(refresh+1);
        }
      )
    }
    if(this.updateCourses){
      this.updateCourses = false;
      if(this.courseLinks.length > 0) {
        firestore().collection('Course').where('CourseId', 'in', this.courseLinks).get().then(
          (values) => {
            this.courses = [{
              CourseId: 'ALL',
              CourseName: 'All'
            }]
            for (let i = 0; i < values.docs.length; i++){
              this.courses[i+1] = {
                CourseId: this.courseLinks[i],
                CourseName: values.docs[i].get('CourseName')
              }
            }

            this.updateStudySessions = true;
            this.refresh(refresh+1);
          }
        )
      } else {
        this.courses = [{
          CourseId: 'ALL',
          CourseName: 'All'
        }]
        this.updateStudySessions = true;
        this.refresh(refresh+1);
      }
    }
    if(this.updateStudySessions) {
      this.updateStudySessions = false;
      //console.log("Got in Study Session Load")
      if(this.courseLinks.length > 0)
      {
        firestore().collection('StudySession').where('ClassId', 'in', this.courseLinks).orderBy('StartDate').get().then(
          (values) => {
            this.studySessions = []
            for(let x = 0; x < values.docs.length; x++){
              let startDate = values.docs[x].get('StartDate')
              let endDate = values.docs[x].get('EndDate')

              this.studySessions[x] =
                {
                  startDate: DateFix.ConvertGoogleToMonthDate(startDate) + " " + DateFix.ConvertGoogleToTime(startDate),
                  startDateRaw: values.docs[x].get('StartDate'),
                  endDate: DateFix.ConvertGoogleToMonthDate(endDate) + " " + DateFix.ConvertGoogleToTime(endDate),
                  endDateRaw: values.docs[x].get('EndDate'),
                  course: values.docs[x].get('ClassId').toString(),
                  notification: "",
                  sessionId: values.docs[x].id
                }
            }
            //console.log(this)
            this.updateDisplay = true;
            this.refresh(refresh+1);
          }
        ).catch(
          (error) => {
            console.log("ERROR: ", error)
          }
        )
      }
      else
      {
        //console.log("fucky wycky")
      }
    }
  }
}

export default model;

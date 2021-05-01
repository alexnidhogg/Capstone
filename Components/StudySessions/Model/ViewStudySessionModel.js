import firestore from '@react-native-firebase/firestore'
import auth from "@react-native-firebase/auth";
import * as DateFix from "../../DateFix/DateFix";

class model {

  courseId;

  startDate;
  startDateRaw;
  endDate;
  endDateRaw;

  description;
  courseName;

  notification;
  sessionId;

  userId;
  organizerName;

  attendeesId;
  attendeesName;

  refresh;
  refreshDisplay;

  constructor(sessionId) {

    this.courseId = null;

    this.startDate = null;
    this.startDateRaw = null;
    this.endDate = null;
    this.endDateRaw = null;

    this.description = null;
    this.courseName = null;

    this.notification = null;
    this.sessionId = sessionId;

    this.organizerId = null;
    this.organizerName = null;

    this.attendeesId = [];
    this.attendeesName = [];

    this.loadSession = true;
    this.loadOrganizer = false;
    this.loadCourse = false;
    this.loadAttendees = false;
    this.loadAttendeesNames = false;

    this.refresh = 0;

    this.refreshDisplay = false;

  }

  SetRefresh(func) {
    this.refresh = func
  }

  Load(refresh) {
    if (this.loadSession) {
      this.loadSession = false;
      firestore().collection('StudySession').doc(this.sessionId).get().then(
        (values) => {

          this.startDate = DateFix.ConvertGoogleToMonthDate(values.get('StartDate')) + " " + DateFix.ConvertGoogleToTime(values.get('StartDate'));
          this.startDateRaw = values.get('StartDate')

          this.endDate = DateFix.ConvertGoogleToMonthDate(values.get('EndDate')) + " " + DateFix.ConvertGoogleToTime(values.get('EndDate'));
          this.endDateRaw = values.get('EndDate')

          this.description = values.get('Description');
          this.courseId = values.get('ClassId');
          this.organizerId = values.get('OrganizerID');

          this.loadOrganizer = true;

          this.refresh(refresh+1);
        }
      )
    }

    if (this.loadOrganizer) {
      this.loadOrganizer = false
      firestore().collection('Users').where('UserId', '==', this.organizerId).get().then(
        (values) => {

          this.organizerName = values.docs[0].get('FirstName') + " " + values.docs[0].get('LastName')

          this.loadCourse = true;

          this.refresh(refresh+1);
        }
      )
    }

    if (this.loadCourse) {
      this.loadCourse = false
      firestore().collection('Course').where('CourseId', '==', this.courseId).get().then(
        (values) => {

          this.courseName = values.docs[0].get('CourseName')

          this.loadAttendees = true;

          this.refresh(refresh+1);
        }
      )
    }

    if (this.loadAttendees) {
      this.loadAttendees = false
      firestore().collection('StudySessionAttendee').where('StudySessionId', '==', this.sessionId).get().then(
        (values) => {
          this.attendeesId = [];
          if(values.docs.length > 0)
          {
            for(let i = 0; i < values.docs.length; i++)
            {
              this.attendeesId[i] = values.docs[i].get('UserId')
            }
          }

          this.loadAttendeesNames = true;

          this.refresh(refresh+1);

        }
      )
    }

    if (this.loadAttendeesNames) {
      this.loadAttendeesNames = false
      if(this.attendeesId.length > 0) {
        firestore().collection('Users').where('UserId', 'in', this.attendeesId).get().then(
          (values) => {
            this.attendeesName = []
            if (values.docs.length > 0) {
              for (let i = 0; i < values.docs.length; i++) {
                this.attendeesName[i] = values.docs[i].get('FirstName') + " " + values.docs[i].get('LastName')
              }
            }

            this.refreshDisplay = true;

            this.refresh(refresh + 1);
          }
        )
      }
      else
      {
        this.refreshDisplay = true;
        this.refresh(refresh + 1);
      }
    }
  }
}


export default model;

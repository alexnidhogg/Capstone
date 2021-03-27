export function ConvertGoogleToMonthDate(timestamptofix) {
  var date = timestamptofix.toDate()
  return GetMonthName(date.getMonth()) + " " + date.getDay()
}

export function ConvertGoogleToTime(timestamptofix) {
  var date = timestamptofix.toDate()
  var hour = date.getHours()
  var returnString = ""
  var ending = "AM"
  var minutes = date.getMinutes()
  if(hour == 0){
    returnString += "12"
  } else if (hour > 12) {
    returnString += (hour - 12).toString()
    ending = "PM"
  }
  returnString += ":"
  if(minutes < 10){
    returnString += "0" + minutes.toString()
  } else {
    returnString += minutes.toString()
  }
  returnString += " " + ending
  return returnString
}

function GetMonthName(monthInt, short = false) {
  if(short) {
    if(monthInt == 0){
      return 'Jan'
    } else if (monthInt == 1){
      return 'Feb'
    } else if (monthInt == 2){
      return 'Mar'
    } else if (monthInt == 3){
      return 'Apr'
    } else if (monthInt == 4){
      return 'May'
    } else if (monthInt == 5){
      return 'Jun'
    } else if (monthInt == 6){
      return 'Jul'
    } else if (monthInt == 7){
      return 'Aug'
    } else if (monthInt == 8){
      return 'Sep'
    } else if (monthInt == 9){
      return 'Oct'
    } else if (monthInt == 10){
      return 'Nov'
    } else if (monthInt == 11){
      return 'Dec'
    }
  } else {
    if(monthInt == 0){
      return 'January'
    } else if (monthInt == 1){
      return 'February'
    } else if (monthInt == 2){
      return 'March'
    } else if (monthInt == 3){
      return 'April'
    } else if (monthInt == 4){
      return 'May'
    } else if (monthInt == 5){
      return 'June'
    } else if (monthInt == 6){
      return 'July'
    } else if (monthInt == 7){
      return 'August'
    } else if (monthInt == 8){
      return 'September'
    } else if (monthInt == 9){
      return 'October'
    } else if (monthInt == 10){
      return 'November'
    } else if (monthInt == 11){
      return 'December'
    }
  }
}



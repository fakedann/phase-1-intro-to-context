// Your code here
function createEmployeeRecord(employee){
  const worker = {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return worker
}

function createEmployeeRecords(employees){
  const groupOfWorkers = []

  for( let person of employees){
    groupOfWorkers.push(createEmployeeRecord(person))
  }

  return groupOfWorkers
}

function createTimeInEvent(employee, date){
  const splitDate = date.split(' ')

  const clockIn = {
    type: "TimeIn",
    hour: parseInt(splitDate[1]),
    date: splitDate[0]
  }

  employee.timeInEvents.push(clockIn)
  return employee
}

function createTimeOutEvent(employee, date){
  const splitDate = date.split(' ')

  const clockOut = {
    type: "TimeOut",
    hour: parseInt(splitDate[1]),
    date: splitDate[0]
  }

  employee.timeOutEvents.push(clockOut)
  return employee
}

function hoursWorkedOnDate(employee, date){
  let timeIn = employee.timeInEvents.find( elem => elem.date === date)
  let timeOut = employee.timeOutEvents.find( elem => elem.date === date )
  return((timeOut.hour-timeIn.hour)/100)
}

function wagesEarnedOnDate(employee, date){
  let hoursWorked = hoursWorkedOnDate(employee, date)
  return hoursWorked*employee.payPerHour

}

function allWagesFor(employee){

  const total = employee.timeInEvents.reduce((accumulator, currentValue) => {
    return accumulator+hoursWorkedOnDate(employee, currentValue.date)
  }, 0)
  
  return total*employee.payPerHour
}

function calculatePayroll(employees){
  const sum = employees.reduce( (accumulator, currentValue) => {
    return accumulator+allWagesFor(currentValue)
  }, 0)
  return sum
}

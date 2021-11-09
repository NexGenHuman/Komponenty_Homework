export default class Date
{
  constructor(day, month, year)
  {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  write(){
    return ((this.day < 10 ? '0' : '') + this.day +'.'+(this.month < 10 ? '0' : '') + this.month + '.' + this.year)
  }
}
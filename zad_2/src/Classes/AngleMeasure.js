export default class AngleMeasure
{
  constructor(degrees, minutes, seconds, direction)
  {
    this.degrees = degrees;
    this.minutes = minutes;
    this.seconds = seconds;
    this.direction = direction;
  }

  write() {
    return this.degrees + "°" + this.minutes + "′" + this.seconds + "″" + this.direction;
  }
}
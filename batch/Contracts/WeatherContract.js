/**
 * Lays out the contract of the Hash Map Keys
 * set for Redis Database.
 * Data will be stored as WeatherContract:${DAY} ${KEY}
 * Day counter starts at 0.
 */
const WeatherContract = {
  /**
   * Date of Weather Forecast.
   */
  DATE: "DATE",
  /**
   * Maximum Temperature for the day.
   */
  MAX: "MAX",
  /**
   * Minimum Temperature for the day.
   */
  MIN: "MIN",
  /**
   * Pressure for the day.
   */
  PRESSURE: "PRESSURE",
  /**
   * Humidity for the day.
   */
  HUMIDITY: "HUMIDITY",
  /**
   * Weather ID code provided by OpenWeatherMaps.
   */
  WEATHER_ID: "WEATHER_ID",
  /**
   * Weather description provided from OpenWeatherMaps.
   */
  WEATHER_DESC: "WEATHER_DESC",
  /**
   * Weather icon code on OpenWeatherMaps.
   */
  WEATHER_ICON: "WEATHER_ICON",
  /**
   * Wind speed.
   */
  WIND_SPEED: "WIND_SPEED",
  /**
   * Wind direction.
   */
  WIND_DIRECTION: "WIND_DIRECTION"
  
}

module.exports = WeatherContract;

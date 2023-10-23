async function setSettings() {
  try {
    var obj = {};
    var settings = await AsyncStorage.getItem('settings');
    settings = JSON.parse(result);
    Object.assign(obj, settings);
    this.setState(obj);
  } catch (e) {
  } finally {
  }
}

function switchChanged(field, value) {
  var obj = {};
  obj[field] = value;
  AsyncStorage.getItem('settings').then(function (strResult) {
    var result = JSON.parse(strResult) || {};
    Object.assign(result, obj);
    AsyncStorage.setItem('settings', JSON.stringify(result));
  });
  this.setState(obj);
}

<Switch
  onValueChange={value => this.switchChanged('reminders', value)}
  value={this.state.reminders}
/>;

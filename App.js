import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import DeviceInfo from 'react-native-device-info';
import EscPosPrinter, {
  getPrinterSeriesByName,
} from 'react-native-esc-pos-printer';

const App = () => {
  const [printer, setPrinter] = React.useState();
  const [printers, setPrinters] = React.useState([]);
  const [loadings, setLoadings] = React.useState(false);
  const [init, setInit] = React.useState(false);
  const requestPermissions = async cb => {
    if (Platform.OS === 'android') {
      const apiLevel = await DeviceInfo.getApiLevel();

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        cb(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        const isGranted =
          result['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        cb(isGranted);
      }
    } else {
      cb(true);
    }
  };

  const scanForPeripherals = async () => {
    setLoadings(true);
    EscPosPrinter.discover({
      scanningTimeoutAndroid: 20000,
      scanningTimeoutIOS: 20000,
    })
      .then(printers => {
        console.log('printers', printers.length);
        console.log('printers', printers);
        setPrinters(printers);
        setLoadings(false);
        /*
    {
      name: "TM_M10",
      ip: "192.168.192.168" or "",
      mac: "12:34:56:78:56:78" or "",
      target: "TCP:192.168.192.168" or "BT:00:22:15:7D:70:9C" or "USB:000000000000000000",
      bt: "12:34:56:78:56:78" or "",
      usb: "000000000000000000" or "";
      usbSerialNumber: "123456789012345678" or ""; // available if usbSerialNumber === true
    }
  */
      })
      .catch(e => console.log('Print error:', e.message));
  };

  const scanForDevices = () => {
    requestPermissions(isGranted => {
      if (isGranted) {
        scanForPeripherals();
        // Alert.alert('Permissions granted');
      } else {
        Alert.alert('Permissions not granted');
      }
    });
  };

  const printItem = async () => {
    try {
      if (printer) {
        if (!init) {
          await EscPosPrinter.init({
            target: printer.target,
            seriesName: getPrinterSeriesByName(printer.name),
            language: 'EPOS2_LANG_EN',
          });
          setInit(true);
        }
        const printing = new EscPosPrinter.printing();
        const status = await printing
          .initialize()
          .align('center')
          .size(3, 3)
          .line('DUDE!')
          .smooth(true)
          .line('DUDE!')
          .smooth(false)
          .size(1, 1)
          .text('is that a ')
          .bold()
          .underline()
          .text('printer?')
          .newline()
          .bold()
          .underline()
          .align('left')
          .text('Left')
          .newline()
          .align('right')
          .text('Right')
          .newline()
          .size(1, 1)
          .textLine(48, {
            left: 'Cheesburger',
            right: '3 EUR',
            gapSymbol: '_',
          })
          .newline()
          .textLine(48, {
            left: 'Chickenburger',
            right: '1.5 EUR',
            gapSymbol: '.',
          })
          .newline()
          .size(2, 2)
          .textLine(48, {left: 'Happy Meal', right: '7 EUR'})
          .newline()
          .align('left')
          .text('Left')
          .newline()
          .align('right')
          .text('Right')
          .newline()
          .align('center')
          .image(
            {
              uri: 'https://raw.githubusercontent.com/tr3v3r/react-native-esc-pos-printer/main/ios/store.png',
            },
            {width: 75},
          )
          .barcode({
            value: 'Test123',
            type: 'EPOS2_BARCODE_CODE93',
            width: 2,
            height: 50,
            hri: 'EPOS2_HRI_BELOW',
          })
          .qrcode({
            value: 'Test123',
            level: 'EPOS2_LEVEL_M',
            width: 5,
          })
          .cut()
          .send();
        console.log('printing status', status);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      {printer && (
        <View style={styles.printerSelected}>
          <Text style={styles.printerSelectedText}>
            Selected printer: {printer.name}
          </Text>
        </View>
      )}
      <View>
        {printers.length > 0 ? (
          <>
            {printers.map(printer => {
              return (
                <TouchableOpacity
                  key={printer.name}
                  style={styles.printers}
                  onPress={() => {
                    console.log('Selected printer:', printer);
                    setPrinter(printer);
                  }}>
                  <Text style={styles.printerName}>{printer.name}</Text>
                </TouchableOpacity>
              );
            })}
          </>
        ) : (
          <>
            {loadings ? (
              <View style={styles.printers}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            ) : (
              <>
                {!printer && (
                  <View style={styles.printerSelected}>
                    <Text style={styles.printerSelectedText}>
                      No printer found. Please try again.
                    </Text>
                  </View>
                )}
              </>
            )}
          </>
        )}
      </View>

      <TouchableOpacity onPress={scanForDevices} style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>
          {printer ? 'Disconnect' : 'Connect'}
        </Text>
      </TouchableOpacity>
      {printer && (
        <TouchableOpacity onPress={printItem} style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>
            PRINT
            {/* {printer ? 'Disconnect' : 'Connect'} */}
          </Text>
        </TouchableOpacity>
      )}

      {/* <Button
        title="Get lines per row"
        disabled={!printer}
        color={!printer ? 'gray' : 'blue'}
        onPress={async () => {
          if (printer) {
            if (!init) {
              await EscPosPrinter.init({
                target: printer.target,
                seriesName: getPrinterSeriesByName(printer.name),
                language: 'EPOS2_LANG_EN',
              });
              setInit(true);
            }

            const status = await EscPosPrinter.getPrinterCharsPerLine(
              getPrinterSeriesByName(printer.name),
            );

            console.log('print', status);
          }
        }}
      /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  ctaButton: {
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  printers: {
    backgroundColor: '#BE93D4',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  printerSelected: {
    // backgroundColor: '#BE93D4',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  printerSelectedText: {
    color: 'black',
  },

  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  printerName: {
    color: 'white',
  },
});

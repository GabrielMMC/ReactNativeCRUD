import React from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const Sigin = () => {
    const [value, setValue] = React.useState('');

  return (
    <SafeAreaView>
        <TextInput
        style={{backgroundColor: 'red'}}
        onChangeText={(e) => setValue(e)}
        value={value}
      />
    </SafeAreaView>
  )
}

export default Sigin
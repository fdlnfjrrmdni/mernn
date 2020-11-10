import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      goods: [],
      groups: []
    }
  }

  componentDidMount() {
    this.getGoods()
    this.getGroups()
  }

  getGoods() {
    fetch('http://jwtmen.herokuapp.com/api/goods')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ goods: json })
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getGroups() {
    fetch('http://jwtmen.herokuapp.com/api/groups')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ groups: json })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getGoodsByGroup(name) {
    fetch('http://jwtmen.herokuapp.com/api/goods?group='+name)
      .then((response) => response.json())
      .then((json) => {
        return json
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render () {
    const { goods, groups } = this.state;

    const keyExtractor = (item, index) => index.toString();

    const renderGroup = ({item}) => (
      <TouchableOpacity style={styles.dropdown} onPress={() => this.setState({collapse: !this.state.collapse})}>
        <View style={styles.centerVertical}>
          <Text style={styles.groupName}>{item.name} ({'1'})</Text>
        </View>
        <View style={styles.centerVertical}>
            <Image style={styles.arrow} source={this.state.collapse ? require('./png/expand-arrow.png') : require('./png/collapse-arrow.png')}/>
        </View>

      </TouchableOpacity>
    );

    const renderGoods = ({item}) => (
      <View style={styles.card}>
        <View style={styles.image}>
          <Text>Image</Text>
        </View>
        <View style={styles.centerVertical}>
          <Text style={styles.txtDesc}>{item.description}</Text>
          <Text style={styles.txtCode}>{item.code}</Text>
        </View>
      </View>
    )

    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <View style={styles.list}>
              <Text style={styles.title}>Goods List</Text>
              <FlatList
                data={groups}
                renderItem={renderGroup}
                keyExtractor={keyExtractor}
              />
              <FlatList
                data={goods}
                renderItem={renderGoods}
                keyExtractor={keyExtractor}
              />
            </View>
            <View style={styles.footer}>
              <View style={styles.btn}>
                <View style={styles.centerVertical}>
                  <Image source={require('./png/left.png')}/>
                </View>
                <View style={styles.centerVertical}>
                  <Text style={styles.txtBtn}>Close</Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    marginVertical: 5,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 10
  },
  image: {
    marginRight: 10,
    width: 70,
    height: 70,
    borderRadius: 70/2,
    backgroundColor: '#3E81EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtDesc: {
    fontSize: 20
  },
  list: {
    backgroundColor: '#fff',
    padding: 20,
  },
  body: {
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    color: '#3E81EE',
    fontSize: 40,
    fontWeight: 'bold',
    paddingVertical: 10
  },
  dropdown: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#aaa',
    paddingVertical: 5,
    marginVertical: 8,
  },
  groupName: {
    fontSize: 18,
  },
  centerVertical: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  arrow: {
    width: 20, height: 20
  },
  footer: {
    backgroundColor: '#3E81EE',
    height: 60,
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  txtBtn: {
    fontSize: 30,
    color: '#fff',
    paddingHorizontal: 10,
  }
});

export default App;

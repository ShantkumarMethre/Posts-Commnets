import React from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Card from './src/components/card';
import {getPosts} from './src/actions/action';
class App extends React.Component {
  state = {
    posts: [],
    Alert_Visibility: false,
    id: -1,
  };
  componentDidMount = async () => {
    let apiData = await getPosts();
    this.setState({posts: apiData});
  };

  renderModel = () => {
    return (
      <Modal
        visible={this.state.Alert_Visibility}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => {
          this.setState({Alert_Visibility: false});
        }}>
        <TouchableOpacity
          style={{flex: 1, backgroundColor: '#D9D7D7', opacity: 0.98}}
          activeOpacity={1}
          onPress={() => {
            this.setState({Alert_Visibility: false});
          }}>
          {this.state.posts.length > 0 ? (
            <FlatList
              data={this.state.posts[0].comments}
              extraData={this.state.posts[0].comments}
              renderItem={({item, index}) => {
                return (
                  <View style={{margin: 3}}>
                    <Card>
                      <Text style={{flexWrap: 'wrap', marginTop: 10}}>
                        {item}
                      </Text>
                    </Card>
                  </View>
                );
              }}
            />
          ) : null}
        </TouchableOpacity>
      </Modal>
    );
  };
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Posts</Text>
        </View>
        <FlatList
          data={this.state.posts}
          extraData={this.state.posts}
          renderItem={({item, index}) => {
            return (
              <View style={{margin: 6}}>
                <Card>
                  <Text style={styles.cardText}>{item.post}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({id: index, Alert_Visibility: true});
                    }}>
                    <Text style={styles.cardCommnet}>comments</Text>
                  </TouchableOpacity>
                </Card>
              </View>
            );
          }}
        />
        {this.renderModel()}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255,217,25)',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerText: {fontWeight: 'bold', fontSize: 18},
  cardText: {flexWrap: 'wrap', marginTop: 10},
  cardCommnet: {margin: 10, fontWeight: 'bold'},
});

export default App;

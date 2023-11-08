import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Categories from '../components/Categories';
import { burgerMenu } from '../constants';
import HomeHeader from '../components/HomeHeader';
import Carousel from '../components/Carousel';
import DishRow from '../components/DishRow';
import { Card } from 'react-native-paper';
import { Image } from 'react-native';

function HomeScreen() {

  console.log("Featured Dishes: ", burgerMenu)

  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <View style={{ width: '100%' }}>
        <HomeHeader />
      </View>
      <ScrollView showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      >
        <Categories />
        <View style={{ marginTop: 20 }}>
          <Carousel />
        </View>
        <View style={{ marginTop: 15 }}>
        </View>
        <View style={{ paddingBottom: 144 }}>
          <Text style={{ marginLeft: 10, paddingHorizontal: 4, paddingVertical: 4, fontWeight: 400, fontSize: 18, lineHeight: 32, color: '#52A63C' }}>Menu</Text>
          <View style={{ flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
              {[burgerMenu].map((menu, index) => {
                return menu.dishes.map((item, index) => <DishRow item={{ ...item }} key={index} />)
              })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
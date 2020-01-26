# rh-movie

react-native movie app built with expo.  
노마드코더 클론 코딩

---

## react-native-swiper 에러처리

[리액트 네이티브 스와이퍼](https://www.npmjs.com/package/react-native-swiper)

리액트 네이티브에서 슬라이더를 깔끔하고 예쁘게 만들어주는 리액트 네이티브 스와이퍼를 사용하다보니 에러가 발생했다.

![에러](https://drive.google.com/uc?id=1ItwMVXx-LXJSFWdUdJdYn2RY6bbJfxXR)  
리액트 네이티브 스와이퍼에서 사용하는 ViewPagerAndroid가 리액트 네이티브로부터 사라지고,  
react-native-community/viewpager을 사용해야 한다는 에러였다.  
그래서 해당 모듈에서 해당 부분을 교체해주었다.

```
yarn add @react-native-community/viewpager
```

후에 **node_modules > react-native-swiper > src > index.js**로 이동해서 react-native-viewpager를 임포트해오는 걸 지운다.

```js
import ViewPager from "@react-native-community/viewpager";
```

그리고 해당 부분을 추가해준다.

```js
return (
  <ViewPager
    ref={this.refScrollView}
    {...this.props}
    initialPage={this.props.loop ? this.state.index + 1 : this.state.index}
    onPageScrollStateChanged={this.onPageScrollStateChanged}
    onPageSelected={this.onScrollEnd}
    key={pages.length}
    style={[styles.wrapperAndroid, this.props.style]}
  >
    {pages}
  </ViewPager>
);
```

그리고 652번줄을 ViewPager로 바꿔주면 에러가 해결된다.

## 탭 네비게이션

[리액트 네비게이션](https://reactnavigation.org/docs/en/getting-started.html) 리액트 네비게이션은 해당 문서를 참고했다.

```js
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

TabNavigation = createBottomTabNavigator({
    Movies: {
      screen: createStack(MoviesScreen, "Movies"),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-film" : "md-film"}
          />
        )
      }
    },
    ...
})

export default createAppContainer(TabNavigation);
```

createBottomTabNavigator를 불러와서 거기에 값을 전달해주고 마지막에 createAppContainer로 감싼뒤 내보내 준다.  
App.js에서는 로딩이 끝나면 해당 컴포넌트를 사용해주면 네비게이션이 적용된 모습을 볼 수 있다.

## 스택 네비게이션

스택 네비게이션은 스택으로 쌓을 것들을 지정해주면 된다.  
해당 앱의 경우 탭네비게이션과 디테일 컴포넌트가 스택으로 쌓이게 된다.

```js
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TabNavigation from "./TabNavigation";
import DetailScreen from "../screens/Detail";

const MainNavigation = createStackNavigator(
  {
    Tabs: { screen: TabNavigation, navigationOptions: { header: null } },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        ...headerStyles
      }
    }
  },
  { headerMode: "screen", headerBackTitleVisible: false }
);

export default createAppContainer(MainNavigation);
```

위와 같이 형태가 되면 탭 네비게이션과 Detail 컴포넌트가 스택 네비게이션 형태로 쌓인다.

## 네비게이션에 포함이 안된느 컴포넌트에 navigation props 전달하기

```js
import { withNavigation } from "react-navigation";
```

이렇게 withNavigation을 import한다.

```js
export default withNavigation(MovieItem);
```

사용하려는 컴포넌트에 withNavigation을 감싼뒤 export한다.  
그러면 해당 컴포넌트에서 props에 navigation을 사용할 수 있다.

```js
...
<TouchableWithoutFeedback
    onPress={() =>
      navigation.navigate({
        routeName: "Detail",
        params: {
          isMovie,
          id,
          posterPhoto,
          backgroundPhoto: null,
          title,
          voteAvg,
          overview
        }
      })
    }
  >
  </TouchableWithoutFeedback>
...
```

해당 앱에서는 MovieItem 컴포넌트를 누르면 Detail로 이동해야 하니 MovieItem에 withNavigation을 불러왔고, navigation.navigate를 통해서 Detail 컴포넌트로 이동시켰다.

## 완성모습

![모습1](https://drive.google.com/uc?id=1Is0RxdYGaUS4s3ugLjo8SfCgPDuKuvsc)  
![모습2](https://drive.google.com/uc?id=1IqtxLCyTs35y8mQrvnAeHPlTPDfx3tZp)  
영화나 티비프로그램을 누르면 디테일 컴포넌트로 이동해서 정보를 보여준다.

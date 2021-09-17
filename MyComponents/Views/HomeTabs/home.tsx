import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
  Dimensions,
  Touchable,
} from "react-native";
import FontAwesome1 from "react-native-vector-icons/FontAwesome";
import { BlurView } from "@react-native-community/blur";
import { Input, Modal } from "native-base";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Plans from "../Plans/planshome";
import Monitor from "../Monitoring/graphs";
import Tracking from "../Tracking/tracking";
import Meal from "../Tracking/meal";
import Daily from "../DailyGoals/dailygoal";
import Vitals from "../Tracking/vitals";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Setting from "../Settings/settings";
import Profile from "../Profile/Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { useAppSelector } from "../../Redux/hooks";
import strings from "./strings";
import stringstwo from "./planshomestrings";
import { Language } from "../../Redux/profilesSlice";

const Drawer = createDrawerNavigator();
import { Props } from "../../types";
import { transparentize } from "native-base/lib/typescript/theme/tools";
import People from "../../People/People";
import Ionicons from "react-native-vector-icons/Ionicons";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      style={{}}
      contentContainerStyle={{
        justifyContent: "space-between",
        backgroundColor: "rgb(240,240,240)",
        height: y,
        width: x * 0.7,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ alignSelf: "flex-start", padding: 25 }}
        onPress={() => {
          props.navigation.dispatch(DrawerActions.closeDrawer());
        }}
      >
        <AntDesign name="close" color="grey" size={38} />
      </TouchableOpacity>
      <View style={{ width: x * 0.7 - 20, marginLeft: 20 }}>
        <DrawerItemList {...props} />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 28 }}>Fitin </Text>
        <View
          style={{
            transform: [{ rotate: "45deg" }],
            marginHorizontal: 10,
          }}
        >
          <AntDesign name="closesquareo" color="rgb(217,125,84)" size={30} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const DrawerWraped = ({ navigation, route }: Props) => {
  return (
    <Drawer.Navigator
      initialRouteName="Fitin Hub"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Fitin Hub" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Setting} />
    </Drawer.Navigator>
  );
};

const Tabs = createBottomTabNavigator();

const Home = ({ navigation, route }: Props) => {
  const language = useAppSelector(
    (state) =>
      state.profiles.profiles[state.profiles.activeProfile]?.settings?.language
  );

  const [modal, setModal] = useState(false);
  const [showQuickTrackModal, setShowQuickTrackModal] = useState(false);

  return (
    <>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { height: 70 },
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Plans") iconName = "compass";
            else if (route.name === "Monitor") iconName = "pie-chart";
            else if (route.name === "People")
              return <Ionicons name={"people"} size={size} color={color} />;
            else if (route.name === "Vitals") iconName = "heart";
            else iconName = "left";

            return <FontAwesome1 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "rgb(110,140,160)",
          tabBarInactiveTintColor: "gray",
        })}
        tabBar={(props) => (
          <View style={styles.navigatorContainer}>
            <BottomTabBar {...props} />
          </View>
        )}
      >
        <Tabs.Screen
          name="Plans"
          options={{ tabBarShowLabel: true }}
          component={Plans}
        />
        <Tabs.Screen
          name="Monitor"
          options={{ tabBarShowLabel: true }}
          component={Monitor}
        />
        <Tabs.Screen
          name="Tracking"
          options={{
            tabBarShowLabel: true,
            tabBarButton: (props) => (
              <View
                {...props}
                pointerEvents={"box-none"}
                style={[styles.mainCircle]}
              >
                <TouchableOpacity
                  onPress={props.onPress}
                  style={styles.mainButton}
                >
                  <AntDesign name="closesquareo" color="white" size={24} />
                  {/*<AntDesign*/}
                  {/*    name="closesquareo"*/}
                  {/*    color="rgb(217,125,84)"*/}
                  {/*    size={30}*/}
                  {/*/>*/}
                </TouchableOpacity>
              </View>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
              // Alert.alert("tabpressed");
              if (!modal) setModal(true);
              else if (modal) setModal(false);
            },
          }}
          component={Tracking}
        />
        <Tabs.Screen
          name="People"
          options={{ tabBarShowLabel: true }}
          component={People}
        />
        <Tabs.Screen
          name="Vitals"
          options={{ tabBarShowLabel: true }}
          component={Vitals}
        />
      </Tabs.Navigator>

      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <BlurView
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
          blurType="dark"
          blurAmount={5}
        />
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={0.9}
          onPress={() => {
            setModal(false);
          }}
        >
          {!showQuickTrackModal ? (
            <>
              <TouchableOpacity
                style={[styles.circle, styles.circle1]}
                onPress={() => {
                  setModal(false);
                  navigation.navigate("Meal");
                }}
              >
                <Text>
                  <MaterialCommunityIcons name="food" color="black" size={34} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.circle, styles.circle2]}
                onPress={() => setShowQuickTrackModal(true)}
              >
                <Text style={{ padding: 2 }}>
                  <MaterialCommunityIcons
                    name="sleep"
                    color="black"
                    size={32}
                  />
                  <MaterialCommunityIcons
                    name="water"
                    color="black"
                    size={32}
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.circle, styles.circle3]}
                onPress={() => {
                  setModal(false);
                  navigation.navigate("MyPlans");
                }}
              >
                <Text>
                  <FontAwesome name="running" color="black" size={34} />
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255, 0.73)",
                  padding: 20,
                  minWidth: 240,
                  marginVertical: 10,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setShowQuickTrackModal(false);
                  setModal(false);
                  navigation.navigate("DailyWaterIntakeGoal", {
                    waterIntake: true,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 32, color: "rgba(255,255,255, 0.73)" }}
                >
                  Water Intake
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255, 0.73)",
                  padding: 20,
                  minWidth: 240,
                  marginVertical: 10,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setShowQuickTrackModal(false);
                  setModal(false);
                  navigation.navigate("DailySleepGoal", {
                    waterIntake: false,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 32, color: "rgba(255,255,255, 0.73)" }}
                >
                  Sleep
                </Text>
              </TouchableOpacity>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.circle, styles.circlex]}
          onPress={() => {
            setShowQuickTrackModal(false);
            setModal(false);
          }}
        >
          <Text>
            <AntDesign name="close" color="white" size={34} />
          </Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(100,100,100,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: y,
    width: x,
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
  },

  navigatorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
    backgroundColor: "transparent",
    elevation: 30,
  },
  mainCircle: {
    position: "relative",
    zIndex: 999,
    width: 65,
    alignItems: "center",
  },
  mainButton: {
    top: -21,
    height: 65,
    width: 65,
    zIndex: 999,
    borderRadius: 40,
    backgroundColor: "rgb(217,125,84)",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "45deg" }],
    elevation: 7,
  },
  circle: {
    width: 65,
    height: 65,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle1: {
    position: "absolute",
    bottom: 90,
    left: 55,
  },
  circle2: {
    position: "absolute",
    bottom: 170,
    marginHorizontal: (x - 80) / 2,
  },
  circle3: {
    position: "absolute",
    bottom: 90,
    right: 55,
  },
  circlex: {
    position: "absolute",
    bottom: 23.5,
    marginHorizontal: (x - 65) / 2,
    backgroundColor: "rgba(217,125,84,1)",
    borderWidth: 0,
    shadowColor: "rgb(217,125,84)",
    shadowRadius: 3.0,
    shadowOpacity: 0.5,
    elevation: 6,
  },
});
export default DrawerWraped;

// tabBarButton: () => (i
//     <TouchableOpacity style={styles.maincircle} onPress={() => { SetModal(false) }}>
//         <Text>H</Text>
//     </TouchableOpacity>)

// }}

//["glass","music","search","envelope-o","heart","star","star-o","user","film","th-large","th","th-list","check","remove","close","times","search-plus","search-minus","power-off","signal","gear","cog","trash-o","home","file-o","clock-o","road","download","arrow-circle-o-down","arrow-circle-o-up","inbox","play-circle-o","rotate-right","repeat","refresh","list-alt","lock","flag","headphones","volume-off","volume-down","volume-up","qrcode","barcode","tag","tags","book","bookmark","print","camera","font","bold","italic","text-height","text-width","align-left","align-center","align-right","align-justify","list","dedent","outdent","indent","video-camera","photo","image","picture-o","pencil","map-marker","adjust","tint","edit","pencil-square-o","share-square-o","check-square-o","arrows","step-backward","fast-backward","backward","play","pause","stop","forward","fast-forward","step-forward","eject","chevron-left","chevron-right","plus-circle","minus-circle","times-circle","check-circle","question-circle","info-circle","crosshairs","times-circle-o","check-circle-o","ban","arrow-left","arrow-right","arrow-up","arrow-down","mail-forward","share","expand","compress","plus","minus","asterisk","exclamation-circle","gift","leaf","fire","eye","eye-slash","warning","exclamation-triangle","plane","calendar","random","comment","magnet","chevron-up","chevron-down","retweet","shopping-cart","folder","folder-open","arrows-v","arrows-h","bar-chart-o","bar-chart","twitter-square","facebook-square","camera-retro","key","gears","cogs","comments","thumbs-o-up","thumbs-o-down","star-half","heart-o","sign-out","linkedin-square","thumb-tack","external-link","sign-in","trophy","github-square","upload","lemon-o","phone","square-o","bookmark-o","phone-square","twitter","facebook-f","facebook","github","unlock","credit-card","feed","rss","hdd-o","bullhorn","bell","certificate","hand-o-right","hand-o-left","hand-o-up","hand-o-down","arrow-circle-left","arrow-circle-right","arrow-circle-up","arrow-circle-down","globe","wrench","tasks","filter","briefcase","arrows-alt","group","users","chain","link","cloud","flask","cut","scissors","copy","files-o","paperclip","save","floppy-o","square","navicon","reorder","bars","list-ul","list-ol","strikethrough","underline","table","magic","truck","pinterest","pinterest-square","google-plus-square","google-plus","money","caret-down","caret-up","caret-left","caret-right","columns","unsorted","sort","sort-down","sort-desc","sort-up","sort-asc","envelope","linkedin","rotate-left","undo","legal","gavel","dashboard","tachometer","comment-o","comments-o","flash","bolt","sitemap","umbrella","paste","clipboard","lightbulb-o","exchange","cloud-download","cloud-upload","user-md","stethoscope","suitcase","bell-o","coffee","cutlery","file-text-o","building-o","hospital-o","ambulance","medkit","fighter-jet","beer","h-square","plus-square","angle-double-left","angle-double-right","angle-double-up","angle-double-down","angle-left","angle-right","angle-up","angle-down","desktop","laptop","tablet","mobile-phone","mobile","circle-o","quote-left","quote-right","spinner","circle","mail-reply","reply","github-alt","folder-o","folder-open-o","smile-o","frown-o","meh-o","gamepad","keyboard-o","flag-o","flag-checkered","terminal","code","mail-reply-all","reply-all","star-half-empty","star-half-full","star-half-o","location-arrow","crop","code-fork","unlink","chain-broken","question","info","exclamation","superscript","subscript","eraser","puzzle-piece","microphone","microphone-slash","shield","calendar-o","fire-extinguisher","rocket","maxcdn","chevron-circle-left","chevron-circle-right","chevron-circle-up","chevron-circle-down","html5","css3","anchor","unlock-alt","bullseye","ellipsis-h","ellipsis-v","rss-square","play-circle","ticket","minus-square","minus-square-o","level-up","level-down","check-square","pencil-square","external-link-square","share-square","compass","toggle-down","caret-square-o-down","toggle-up","caret-square-o-up","toggle-right","caret-square-o-right","euro","eur","gbp","dollar","usd","rupee","inr","cny","rmb","yen","jpy","ruble","rouble","rub","won","krw","bitcoin","btc","file","file-text","sort-alpha-asc","sort-alpha-desc","sort-amount-asc","sort-amount-desc","sort-numeric-asc","sort-numeric-desc","thumbs-up","thumbs-down","youtube-square","youtube","xing","xing-square","youtube-play","dropbox","stack-overflow","instagram","flickr","adn","bitbucket","bitbucket-square","tumblr","tumblr-square","long-arrow-down","long-arrow-up","long-arrow-left","long-arrow-right","apple","windows","android","linux","dribbble","skype","foursquare","trello","female","male","gittip","gratipay","sun-o","moon-o","archive","bug","vk","weibo","renren","pagelines","stack-exchange","arrow-circle-o-right","arrow-circle-o-left","toggle-left","caret-square-o-left","dot-circle-o","wheelchair","vimeo-square","turkish-lira","try","plus-square-o","space-shuttle","slack","envelope-square","wordpress","openid","institution","bank","university","mortar-board","graduation-cap","yahoo","google","reddit","reddit-square","stumbleupon-circle","stumbleupon","delicious","digg","pied-piper-pp","pied-piper-alt","drupal","joomla","language","fax","building","child","paw","spoon","cube","cubes","behance","behance-square","steam","steam-square","recycle","automobile","car","cab","taxi","tree","spotify","deviantart","soundcloud","database","file-pdf-o","file-word-o","file-excel-o","file-powerpoint-o","file-photo-o","file-picture-o","file-image-o","file-zip-o","file-archive-o","file-sound-o","file-audio-o","file-movie-o","file-video-o","file-code-o","vine","codepen","jsfiddle","life-bouy","life-buoy","life-saver","support","life-ring","circle-o-notch","ra","resistance","rebel","ge","empire","git-square","git","y-combinator-square","yc-square","hacker-news","tencent-weibo","qq","wechat","weixin","send","paper-plane","send-o","paper-plane-o","history","circle-thin","header","paragraph","sliders","share-alt","share-alt-square","bomb","soccer-ball-o","futbol-o","tty","binoculars","plug","slideshare","twitch","yelp","newspaper-o","wifi","calculator","paypal","google-wallet","cc-visa","cc-mastercard","cc-discover","cc-amex","cc-paypal","cc-stripe","bell-slash","bell-slash-o","trash","copyright","at","eyedropper","paint-brush","birthday-cake","area-chart","pie-chart","line-chart","lastfm","lastfm-square","toggle-off","toggle-on","bicycle","bus","ioxhost","angellist","cc","shekel","sheqel","ils","meanpath","buysellads","connectdevelop","dashcube","forumbee","leanpub","sellsy","shirtsinbulk","simplybuilt","skyatlas","cart-plus","cart-arrow-down","diamond","ship","user-secret","motorcycle","street-view","heartbeat","venus","mars","mercury","intersex","transgender","transgender-alt","venus-double","mars-double","venus-mars","mars-stroke","mars-stroke-v","mars-stroke-h","neuter","genderless","facebook-official","pinterest-p","whatsapp","server","user-plus","user-times","hotel","bed","viacoin","train","subway","medium","yc","y-combinator","optin-monster","opencart","expeditedssl","battery-4","battery","battery-full","battery-3","battery-three-quarters","battery-2","battery-half","battery-1","battery-quarter","battery-0","battery-empty","mouse-pointer","i-cursor","object-group","object-ungroup","sticky-note","sticky-note-o","cc-jcb","cc-diners-club","clone","balance-scale","hourglass-o","hourglass-1","hourglass-start","hourglass-2","hourglass-half","hourglass-3","hourglass-end","hourglass","hand-grab-o","hand-rock-o","hand-stop-o","hand-paper-o","hand-scissors-o","hand-lizard-o","hand-spock-o","hand-pointer-o","hand-peace-o","trademark","registered","creative-commons","gg","gg-circle","tripadvisor","odnoklassniki","odnoklassniki-square","get-pocket","wikipedia-w","safari","chrome","firefox","opera","internet-explorer","tv","television","contao","500px","amazon","calendar-plus-o","calendar-minus-o","calendar-times-o","calendar-check-o","industry","map-pin","map-signs","map-o","map","commenting","commenting-o","houzz","vimeo","black-tie","fonticons","reddit-alien","edge","credit-card-alt","codiepie","modx","fort-awesome","usb","product-hunt","mixcloud","scribd","pause-circle","pause-circle-o","stop-circle","stop-circle-o","shopping-bag","shopping-basket","hashtag","bluetooth","bluetooth-b","percent","gitlab","wpbeginner","wpforms","envira","universal-access","wheelchair-alt","question-circle-o","blind","audio-description","volume-control-phone","braille","assistive-listening-systems","asl-interpreting","american-sign-language-interpreting","deafness","hard-of-hearing","deaf","glide","glide-g","signing","sign-language","low-vision","viadeo","viadeo-square","snapchat","snapchat-ghost","snapchat-square","pied-piper","first-order","yoast","themeisle","google-plus-circle","google-plus-official","fa","font-awesome","handshake-o","envelope-open","envelope-open-o","linode","address-book","address-book-o","vcard","address-card","vcard-o","address-card-o","user-circle","user-circle-o","user-o","id-badge","drivers-license","id-card","drivers-license-o","id-card-o","quora","free-code-camp","telegram","thermometer-4","thermometer","thermometer-full","thermometer-3","thermometer-three-quarters","thermometer-2","thermometer-half","thermometer-1","thermometer-quarter","thermometer-0","thermometer-empty","shower","bathtub","s15","bath","podcast","window-maximize","window-minimize","window-restore","times-rectangle","window-close","times-rectangle-o","window-close-o","bandcamp","grav","etsy","imdb","ravelry","eercast","microchip","snowflake-o","superpowers","wpexplorer","meetup"].

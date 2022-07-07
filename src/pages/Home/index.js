import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext } from 'react';
import { Image, StatusBar, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderPortal from '../../components/Header/Portal';
import { AuthContext } from '../../contexts/auth';


import { LButtonMaster, BoxHome, ContainerPortal } from './style';

export default function Home() {
    const { signOut, fatuTotLojas } = useContext(AuthContext);
 
    const navigation = useNavigation();
    return (

        <BoxHome
            startColor="#00a8ea"
            endColor="#009DE0" // Meio
            alignItems="center"
            justifyContent="center"
        >
            <HeaderPortal
                startColor="#009DE0" // Meio
                endColor="#00a8ea"
                bgStatus="#00a8ea"
                textColor="#FFF"
                title="Grupo Solar"
                subTitle="Relatórios Administrativos"
                barStyle='light-content'
            />
            <ContainerPortal>
                <LButtonMaster
                    bgcolor="#004099"
                    onPress={() => navigation.navigate('LojasScreen')}
                >
                    <Image source={require('../../assets/solar.png')} />
                </LButtonMaster>

                <LButtonMaster
                    bgcolor="#F5AB00"
                    onPress={() => navigation.navigate('NaturScreen')}
                >
                    <Image source={require('../../assets/natur.png')} />
                </LButtonMaster>

                <LButtonMaster
                    bgcolor="#EB6909"
                    onPress={() => navigation.navigate('SuperScreen')}
                >
                    <Image source={require('../../assets/super.png')} />
                </LButtonMaster>

                {/* <TouchableOpacity
                onPress={signOut}
                style={{
                    // flex: 1,
                    width: 40,
                    height: 40,
                    backgroundColor: "#dc2626",
                    // paddingHorizontal: 8,
                    // paddingVertical: 6,
                    borderRadius: 5,
                    elevation: 2,
                    // borderWidth: 1,
                    // borderColor: '#dedede'
                }}

            >
                <LinearGradient colors={["#ff0000", "#dc2626", "#fc3e2d"]}
                    style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 1,  borderColor: '#dc2626', padding: 2,  }}
                    start={{ x: 0.1, y: 0.8 }}
                    end={{ x: 0.1, y: 0.1 }}
                >
                    <Icon name="ios-exit-outline" size={25} color="#fdfdfd" />
                </LinearGradient>

            </TouchableOpacity> */}
            </ContainerPortal>
        </BoxHome>

    );
}

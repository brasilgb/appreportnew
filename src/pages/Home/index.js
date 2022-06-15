import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StatusBar } from 'react-native';

import { LButtonMaster, BoxHome } from './style';

export default function Home() {

    const navigation = useNavigation();
    return (

        <BoxHome
            startColor="#00a8ea"
            endColor="#009DE0"
            alignItems="center"
            justifyContent="center"
        >
            <StatusBar backgroundColor='#009DE0' />
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

        </BoxHome>

    );
}
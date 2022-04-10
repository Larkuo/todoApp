import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {Feather as Icon} from '@expo/vector-icons';

export default Task = ({status, title, description, category, dateStarted, dateEnded}) => {

    const [checkIcon, setCheckIcon] = useState("square");
    const [taskStatus, changeTaskStatus] = useState(status);
    const [viewVisible, changeItemVisibility] = useState(false);
    const [endDate, changeDateEnded] = useState(dateEnded);

    const checkStatus = () => {
        if(taskStatus == 0){
            setCheckIcon("square")
        }else if(taskStatus == 1){
            setCheckIcon("check-square")
        }
    }

    const onPressCheck = () => {
        if(taskStatus == 0){
            changeTaskStatus(1)
            changeDateEnded("----.--.--T--.--:--:--.---Z")
        }else if(taskStatus == 1){
            changeTaskStatus(0)
            var d = new Date();
            changeDateEnded(d.toISOString())
        }
        checkStatus()
    }

    const onPressTask = () => {
        if(viewVisible == true){
            changeItemVisibility(false)
        }else{
            changeItemVisibility(true)
        }
    }


    return(
        <View style={styles.task_card}>
            <TouchableOpacity onPress={() => onPressCheck()}>
                    <Icon name={checkIcon} size={27} color={'#000000'} style={{padding:1}}/>
            </TouchableOpacity>
            <View style={styles.title_x_category}>
                <TouchableOpacity onPress={() => onPressTask()}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.category}>{category}</Text>
                    {
                        viewVisible ? (
                            <View>
                                <Text style={styles.description}>{description}</Text>
                                <Text style={styles.description}>Started: {dateStarted}</Text>
                                <Text style={styles.description}>Ended: {endDate}</Text>
                            </View>
                        ) : null
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    task_card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#000000',
        shadowRadius: 5,
        shadowOpacity: 0.2,
    },
    title_x_category: {
        marginLeft: 2,
        flexWrap: 'wrap',
    },
    title: {
        fontSize: 15,
        color: '#2b6684',
    },
    category: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#006bbd',
    },
    description: {
        fontSize: 10,
        color: '#000000',
        flexWrap: 'wrap',
    },
});
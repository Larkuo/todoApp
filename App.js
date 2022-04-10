import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import {AntDesign as AIcon} from '@expo/vector-icons';
import Task from './components/Task';

export default function App() {

  var taskCollection = require('./json_files/Tasks.json');
  const taskCategories = require('./json_files/TaskCategories.json');

  const [taskModal, setTaskModalVisible] = useState(false);
  const [categoryModal, setCategoryModalVisible] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [newCategory, setNewCategory] = useState("");

  const deleteTask = ({ task_id }) => {
    taskCollection = taskCollection.splice(task_id-1, 1)
  }

  const renderItem = ({ item }) => (
    <View>
    <Task
        status={item.status}
        title={item.title}
        description={item.description}
        category={taskCategories[item.taskCategoryId - 1].name}
        dateStarted={item.dateStarted}
        dateEnded={item.dateEnded}

    />
    <TouchableOpacity onPress={() => deleteTask(item.id)}>
      <AIcon 
        name={"delete"}
        size={27} color={"#ffffff"}
        style={{padding:1, backgroundColor:"#2b6684", marginBottom: 15, borderRadius: 25}}/>
    </TouchableOpacity>
    </View>

  );

  const onClickAddTask = () => {
    const currentDate = new Date()
    taskCollection.push({
      id: (taskCollection[taskCollection.length-1].id) + 1,
      title: taskTitle,
      description: taskDescription,
      status: 0,
      taskCategoryId: selectedCategory,
      comments: [{
        message: "New task added",
        createdOn: currentDate.toISOString(),
        updatedOn: currentDate.toISOString()
      }],
      dateStarted: currentDate.toISOString(),
      dateEnded: "----.--.--T--.--:--:--.---Z"
    })
    setTaskModalVisible(!taskModal)
  }

  const onClickAddCategory = () => {
    const currentDate = new Date()

    taskCategories.push({
      id: taskCategories.length + 1,
      name: newCategory,
      createdOn: currentDate.toISOString(),
      updatedOn: currentDate.toISOString()
    })

    setCategoryModalVisible(!categoryModal)
  }

  const renderCategory = ({ item }) => (
    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft:5}}>
    <Text>[{item.id}] {item.name}</Text>
    </View>
  )


  return (
    <View style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.tasklist_title}>Task List</Text>
      </View>
      <View style={styles.tasks_container}>
      <FlatList nestedScrollEnabled={true} style={{maxHeight:'70%'}}
        data={taskCollection}
        renderItem={ renderItem }
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.button_container} onPress={() => setTaskModalVisible(true)}>
        <Text style={styles.button_text}>Add New Task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button_container} onPress={() => setCategoryModalVisible(true)}>
        <Text style={styles.button_text}>Add New Task Category</Text>
      </TouchableOpacity>
      </View>

      <Modal
        animationType="slide" transparent={false} visible={taskModal}
        onRequestClose={() => { Alert.alert("New Task modal has been closed.");
        setTaskModalVisible(!taskModal);}}>
        <View style={styles.modal_container}>
          <TextInput
            style={styles.task_input_a}
            placeholder="Enter Task Title"
            onChangeText={newText => setTaskTitle(newText)}
            defaultValue={taskTitle}
          />
          <TextInput
            style={styles.task_input}
            placeholder="Enter Task Description"
            onChangeText={newText => setTaskDescription(newText)}
            defaultValue={taskDescription}
          />
          <TextInput
            style={styles.task_input_b}
            placeholder="Enter Task Category Number"
            onChangeText={newText => setSelectedCategory(newText)}
          />
          <Text style={styles.modal_select}>Existing Categories</Text>
          <FlatList nestedScrollEnabled={true} style={{maxHeight:'50%'}}
            data={taskCategories}
            renderItem={ renderCategory }
            keyExtractor={item => item.id}
          />
          <TouchableOpacity style={styles.modal_button_container} onPress={() => onClickAddTask()}>
            <Text style={styles.modal_button_text}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide" transparent={false} visible={categoryModal}
        onRequestClose={() => { Alert.alert("New Category modal has been closed.");
        setCategoryModalVisible(!categoryModal);}}>
        <View style={styles.modal_container}>
          <TextInput
            style={styles.category_input}
            placeholder="Enter New Category Name"
            onChangeText={newText => setNewCategory(newText)}
            defaultValue={newCategory}
          />
          <TouchableOpacity style={styles.modal_button_container} onPress={() => onClickAddCategory()}>
            <Text style={styles.modal_button_text}>Add Category</Text>
          </TouchableOpacity>
          <Text style={styles.modal_select}>Existing Categories</Text>
          <FlatList nestedScrollEnabled={true} style={{maxHeight:'50%'}}
            data={taskCategories}
            renderItem={ renderCategory }
            keyExtractor={item => item.id}
          />
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#012e67',
  },
  title_container:{
    alignItems: 'center',
    backgroundColor: '#012e67',
  },
  tasklist_title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 25,
    marginBottom: 10,
  },
  tasks_container: {
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop: 10,
    padding: 10,
    borderRadius: 25,
  },
  button_text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#012e67',
  },
  task_input_a: {
    height: 50,
    borderColor: '#012e67',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginTop: 40,
  },
  task_input_b: {
    height: 50,
    borderColor: '#012e67',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginTop: 10,
  },
  task_input: {
    height: 100,
    borderColor: '#012e67',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  modal_button_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#012e67',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  modal_button_text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modal_select: {
    marginTop: 25,
    marginLeft: 5,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#012e67',
  },
  category_input: {
    height: 50,
    borderColor: '#012e67',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginTop: 40,
  },
});

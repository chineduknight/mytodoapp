import {
  Avatar,
  Button,
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Checkbox,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
type TodoType = {
  id: string;
  text: string;
  completed: boolean;
};
const Home = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [currentTodo, setCurrentTodo] = useState<TodoType>({
    id: "",
    text: "",
    completed: false,
  });
  const [editIndex, setEditIndex] = useState(false); // -1 means no todo is being edited

  const handleEdit = (editTodo) => {
    setEditIndex(true);
    setCurrentTodo(editTodo);
  };

  // Function to add a new todo
  const handleAddTodo = () => {
    if (currentTodo.text.trim() !== "") {
      setTodos([...todos, currentTodo]);
      setCurrentTodo({ id: "", text: "", completed: false }); // Reset input after adding
    }
  };
  // Function to add a new todo or update an existing one
  const handleSaveTodo = () => {
    if (editIndex) {
      handleEditTodo();
    } else {
      handleAddTodo();
    }
  };
  const handleTodoInputChange = (e) => {
    setCurrentTodo({
      ...currentTodo,
      text: e.target.value,
      id: currentTodo.id ? currentTodo.id : uuidv4(), // Keep existing ID or generate a new one
    });
  };

  // Function to save an edited todo
  const handleEditTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === currentTodo.id ? currentTodo : todo
    );
    setTodos(updatedTodos);
    setCurrentTodo({ id: "", text: "", completed: false }); // Reset input after editing
    setEditIndex(false); // Reset editing index
  };

  // Function to toggle todo completion
  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };
  const handleAdd = () => {
    setEditIndex(false);
    setCurrentTodo({ id: "", text: "", completed: false }); // Reset input after adding
  };
  return (
    <Flex>
      <Box
        as="nav"
        width="414px"
        bg="#F3F3F3"
        boxShadow="0px 0px 7px 2px rgba(0, 0, 0, 0.25)"
        position="relative"
        zIndex="3"
        h="100vh"
      >
        <Flex bg="#3556AB" p="1rem 2.5rem 1rem 1rem" h="116px" width="414px">
          <Avatar w="50px" h="50px" mr="2rem" src="./face.png" />
          <Box>
            <Text color="#fff" fontWeight={500}>
              Hello, John
            </Text>
            <Heading
              fontSize="25px"
              fontWeight={100}
              fontStyle="italic"
              color="#fff"
              w="221px"
            >
              What are your plans for today?
            </Heading>
          </Box>
        </Flex>
        <Flex
          h="116px"
          alignItems="center"
          bg="#CDE53D"
          border="2px solid #9EB031"
          position="relative"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.1)"
        >
          <Image src="./cup.png" alt="cup" ml="1rem" mr="1rem" />
          <Text
            color="#071D55"
            fontSize="18px"
            fontWeight={700}
            lineHeight="19.05px"
            textShadow="0 1px 0 #FFFFFF"
          >
            Go Pro Upgrade Now
          </Text>
          <Flex
            position="absolute"
            top="0"
            w="66.11px"
            h="71px"
            bg="#071D55"
            color="#F2C94C"
            justifyContent="center"
            alignItems="center"
            right="30px"
          >
            $1
          </Flex>
        </Flex>
        <Box px="1rem" height="600px" overflowY="scroll">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              handleEdit={handleEdit}
              handleToggle={() => handleToggleTodo(todo.id)}
            />
          ))}
        </Box>
        <Button
          w="60px"
          h="60px"
          borderRadius="50%"
          bg="#3556AB"
          position="absolute"
          bottom="20px"
          right="20px"
        >
          <FaPlus onClick={handleAdd} color="#fff" fontSize="20px" />
        </Button>
      </Box>
      <Box as="main" w="100%" bg="#F3F3F3" position="relative">
        <Flex
          h="123px"
          bg="#3556AB"
          color="#fff"
          justifyContent="center"
          alignItems="center"
        >
          {editIndex ? "Edit Task" : "Add Task"}
        </Flex>
        <Box mt="1.5rem" ml="1rem" pr="1.5rem">
          <Text>Task Name</Text>
          <Input
            value={currentTodo.text}
            onChange={handleTodoInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault(); // Prevent the default action
                handleSaveTodo();
              }
            }}
            mt="0.5rem"
            bg="#fff"
            border="2px solid #CBCBCB"
            h="69px"
            _focus={{
              outline: "none",
              borderColor: "#A8A8A8",
            }}
          />
        </Box>
        <Flex position="absolute" bottom="20px" w="100%" pl="1rem" pr="1.5rem">
          <Button
            w="121px"
            bg="#AB3535"
            border="1px solid #720D0D"
            color="#fff"
            h="61px"
            mr="1rem"
            fontSize="18px"
          >
            Delete
          </Button>
          <Button
            onClick={handleSaveTodo}
            w="100%"
            h="61px"
            bg="#3556AB"
            color="#fff"
            fontSize="18px"
          >
            {editIndex ? "Update" : "Save"}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;

const TodoCard = ({ todo, handleEdit, handleToggle }) => {
  return (
    <Flex
      bg="#FFFFFF"
      border="1px solid #E7E7E7"
      borderRadius="6px"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.1)"
      h="91px"
      mt="1.3rem"
      pl="1.5rem"
      pr="1rem"
    >
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <Flex justifyContent="center" alignItems="center">
          <Checkbox
            mr=".5rem"
            variant="circular"
            size="xl"
            borderColor="#071D55"
            isChecked={todo.completed}
            onChange={handleToggle}
          />

          <Text
            as={todo.completed ? "s" : "p"}
            color={todo.completed ? "#8D8D8D" : ""}
          >
            {todo.text}
          </Text>
        </Flex>
        <Button
          onClick={() => {
            handleEdit(todo);
          }}
        >
          Edit
        </Button>
      </Flex>
    </Flex>
  );
};

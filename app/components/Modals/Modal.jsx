"use client";
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";


const Modal = ({ show, onClose, onSubmit }) => {
    const [task, setTask] = useState({

        title: "",
        status: "todo",
        priority: "Low",
        date: "",
        description: "",
    });
    console.log(task)
    const { userId } = useAuth();
    const [customProperties, setCustomProperties] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddProperty = () => {
        setCustomProperties([...customProperties, ""]);
    };

    const handlePropertyChange = (index, value) => {
        const newProperties = [...customProperties];
        newProperties[index] = value;
        setCustomProperties(newProperties);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskDetails = {
            userId: userId,
            title: task.title,
            status: task.status,
            priority: task.priority,
            date: task.date,
            description: task.description,
        };

        console.log(taskDetails);
        try {
            const res = await axios.post("/api/tasks", taskDetails);

            if (res.data.error) {
                toast.error(res.data.error);
            } else {
                toast.success("Task created successfully.");
                // onSubmit(taskDetails);
                onClose();
            }
        } catch (error) {
            toast.error("Something went wrong.");
            console.log(error);
        }
    };

    const handleShare = async () => {
        const taskDetails = {
            userId: userId,
            title: task.title,
            status: task.status,
            priority: task.priority,
            date: task.date,
            description: task.description,
        };

        if (navigator.share) {
            try {
                await navigator.share({
                    title: task.title,
                    text: taskDetails,
                });
                toast.success("Task shared successfully!");
            } catch (error) {
                console.error("Error sharing task:", error);
                toast.error("Error sharing task.");
            }
        } else {
            try {
                await navigator.clipboard.writeText(taskDetails);
                toast.success("Task details copied to clipboard!");
            } catch (error) {
                console.error("Error copying task details:", error);
                toast.error("Error copying task details.");
            }
        }
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    if (!show) return null;

    return (
        <>
            <ModalOverlay>
                <ModalContent>
                    <CloseButton onClick={onClose}>×</CloseButton>
                    <Header>
                        <Title>{task.title || "New Task"}</Title>
                        <Actions>
                            <ActionButton onClick={handleShare}>Share</ActionButton>
                            <Image width={15} height={15} src="/share.png" alt="" />

                            <ActionButton onClick={toggleFavorite}>
                                {isFavorite ? "Unfavorite" : "Favorite"}
                            </ActionButton>
                            <Image width={15} height={15} src="/favourite.png" alt="" />

                        </Actions>
                    </Header>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            {/* <Label>Title</Label> */}
                            <Input className="title-design"
                                type="text"
                                name="title"
                                value={task.title}
                                onChange={handleInputChange}
                                placeholder="Title"
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Status</Label>
                            <Select
                                name="status"
                                value={task.status}
                                onChange={handleInputChange}
                            >
                                <option value="not-selected">Not Selected</option>
                                <option value="todo">To do</option>
                                <option value="in-progress">In progress</option>
                                <option value="under-review">Under review</option>
                                <option value="finished">Finished</option>
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label>Priority</Label>
                            <Select
                                name="priority"
                                value={task.priority}
                                onChange={handleInputChange}
                            >
                                <option value="not-selected">Not Selected</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="Urgent">Urgent</option>
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label>Deadline</Label>
                            <Input
                                type="date"
                                name="deadline"
                                value={task.date}
                                onChange={(e) => setTask({ ...task, date: e.target.value })}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input
                                name="description"
                                placeholder="Write something..."
                                value={task.description}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <CustomProperties>
                            {customProperties.map((property, index) => (
                                <FormGroup key={index}>
                                    <Input
                                        value={property}
                                        onChange={(e) =>
                                            handlePropertyChange(index, e.target.value)
                                        }
                                    />
                                </FormGroup>
                            ))}
                            <AddPropertyButton onClick={handleAddProperty}>
                                + Add custom property
                            </AddPropertyButton>
                        </CustomProperties>
                        <SubmitButton type="submit">Add Task</SubmitButton>
                    </Form>
                </ModalContent>
            </ModalOverlay>
            <ToastContainer />
        </>
    );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: none;
  color: grey;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormGroup = styled.div`
  display: flex;
   flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: light;
  margin-right: 10px;
  width: 30%;
  color: grey;
`;

const Input = styled.input`
  padding: 10px;
  
  width: 100%;
  color: grey;

  &.title-design {
    border: 0px;
    font-size: 30px;
  }
  &:focus {
    border: 1px solid grey;
  border-radius: 5px;
    outline: none; 
  }
`;

// const Textarea = styled.textarea`
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   resize: vertical;
// `;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  color: grey;
`;

const CustomProperties = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddPropertyButton = styled.button`
  background: none;
  border: none;
  color: #0F172F;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 5px;
`;

const SubmitButton = styled.button`
  background: #0F172F;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;
`;

export default Modal;

import React from "react";
import "./styles/partnerCard.scss";
import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.min.css";
import Popup from "./popup/RewardClickPopup";

const PartnerCardSingular = (props) => {
	console.log(props);
	// all the cards below are sample cards

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onFinish = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className="card">
			<div className="card__body">
				<img src={props.card.img} className="card__image" alt="company logo" />
				<h2 className="card__title">{props.card.title}</h2>
				<p className="card__description">{props.card.desc} </p>
			</div>
			<Button type="primary" onClick={showModal}>
				Claim rewards
			</Button>
			<Modal
				title={props.card.title}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Username"
						name="username"
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
							{
								pattern: new RegExp(
									/^(\d{9}|\d{10}|\d{12}|\d{16}|[0-9]{9}[A-Z]{1})$/
								),
								message: "Please input valid membership ID",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};
export default PartnerCardSingular;

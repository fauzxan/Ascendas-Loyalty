import React, { useRef } from "react";
import "./styles/partnerCard.scss";
import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.min.css";
import Popup from "./popup/RewardClickPopup";
import Axios from "axios";
import { host } from "./config";
import { Spin } from "antd";

const PartnerCardSingular = (props) => {
	//console.log(props);
	// all the cards below are sample cards

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [success, setSuccess] = useState(false);
	const [amt, setAmt] = useState(0);
	const [cc, setCc] = useState("");
	let claim_submit_id = "claim_submit-" + props.name + "_button";
	let claim_rewards_id = "claim_rewards-" + props.title + "_button";

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
		let date = new Date();

		let today = `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()}`;
		let fullname = localStorage.getItem("user");
		let email = localStorage.getItem("email");
		let partnercode = "Daddy's bank";
		let memid = values.membership_number;
		let amt = values.amount;
		let lpro = props.card.title;
		Axios.post(host + "/submitcreditreq", {
			memberid: memid,
			fullname: fullname,
			amount: amt,
			date: today,
			partnercode: partnercode,
			loyaltyprogramme: lpro,
			email: email,
		})
			.then((response) => {
				setCc(response.data.refcode);
			})
			.catch((err) => {
				console.warn(err);
			});
		handleOk();
		setSuccess(true);
		setAmt(amt);
		Axios.post(host + "/createhandback", {
			date: today,
			amount: amt,
			outcomecode: "42069",
		})
			.then((response) => {
				console.log("Data sent to the buffer handback file");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const counter = useRef(0);
	const [loading, setLoading] = useState(true);
	const imageLoaded = () => {
		counter.current += 1;
		setLoading(false);
	};

	return (
		<div className="card">
			<div className="card__body">
				<div style={{ display: loading ? "block" : "none" }}>
					<Spin />
				</div>
				<div style={{ display: loading ? "none" : "block" }}>
					<img
						src={props.card.img}
						className="card__image"
						alt="company logo"
						onLoad={imageLoaded}
					/>
				</div>
				<h2 className="card__title">{props.card.programName}</h2>
				<p className="card__description">{props.card.description} </p>
			</div>
			<button
				id={"claim_rewards-" + props.card.id + "_button"}
				type="primary"
				onClick={showModal}
				className="card__btn hover hover__btn"
			>
				Claim rewards
			</button>

			<Modal
				title={props.card.title}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
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
						label="Membership number"
						name={"mem_number_" + props.card.id}
						rules={[
							{
								required: true,
								message: "Please input membership ID",
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
						label="Amount (Min is 1)"
						name={"amount_" + props.card.id}
						rules={[
							{
								required: true,
								message: "Please input amount of points to transfer",
							},
						]}
					>
						<Input
							type="number"
							name="test_name"
							min="1"
							oninput="validity.valid||(value='');"
						/>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button
							id={"claim_submit-" + props.card.id + "_button"}
							type="primary"
							htmlType="submit"
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			{success && (
				<Popup success={setSuccess} amt={amt} cc={cc} setcc={setCc} />
			)}
		</div>
	);
};
export default PartnerCardSingular;

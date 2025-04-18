import { View, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import Title from "../Text/Title";
import Paragraph from "../Text/Paragraph";
import InputField from "../fields/InputField";
import CustomButton from "../CustomButton";
import { submittedFeedback } from "@/config/firebaseFunctions";

type Props = {
  modalVisible: "feedback" | "submitted" | false;
  setModalVisible: (value: "feedback" | "submitted" | false) => void;
};

const FeedbackForm = ({ modalVisible, setModalVisible }: Props) => {
  const [feedback, setFeedback] = useState("");

  const submit = () => {
    submittedFeedback(feedback);
    setFeedback("");
    setModalVisible("submitted");
  };

  return (
    <Modal visible={modalVisible !== false} transparent animationType="slide">
      <TouchableWithoutFeedback
        onPress={() => setModalVisible(false)}
        className="flex-1"
      >
        <View className="flex-1 items-center pt-40 bg-dark-100/50">
          <View
            onStartShouldSetResponder={() => true}
            className="bg-dark-200 items-center justify-center w-[70%] py-8 px-4 rounded-2xl border border-primary-300"
          >
            {modalVisible === "feedback" ? (
              <>
                <Title title="Feedback" />
                <Paragraph
                  text="We would love to hear your thoughts!"
                  styles="text-center text-light-200"
                />
                <View className="justify-between w-full px-4 mt-8 gap-8">
                  <InputField
                    placeholder="Feedback:"
                    lines={8}
                    value={feedback}
                    onChangeText={setFeedback}
                  />
                  <CustomButton label="Submit" onPress={submit} />
                </View>
              </>
            ) : (
              <>
                <Title title="Success!" />
                <Paragraph text="Thank you for your feedback!" />
                <CustomButton
                  styles="mt-8"
                  label="Close"
                  onPress={() => setModalVisible(false)}
                />
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FeedbackForm;

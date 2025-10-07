import React from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    View,
} from 'react-native';
import QuotationForm from '../form/QuotationForm';


const QuotationModal= ({
  visible,
  onClose,
  onSubmit,
  initialData,
}) => {
  const handleSubmit = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 bg-white">
          <QuotationForm
            onClose={onClose}
            onSubmit={handleSubmit}
            initialData={initialData}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default QuotationModal;

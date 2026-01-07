import { AppColors } from "@/constants/app-colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const AI_TOOLS = [
  { id: '1', title: 'Lesson Planner', icon: 'book-open-variant', color: '#3B82F6', description: 'Generate a detailed lesson plan for any topic.' },
  { id: '2', title: 'Quiz Generator', icon: 'fountain-pen-tip', color: '#10B981', description: 'Create a quiz based on your curriculum.' },
  { id: '3', title: 'Performance Insights', icon: 'chart-bell-curve-cumulative', color: '#F59E0B', description: 'Analyze student data for actionable insights.' },
  { id: '4', title: 'Email Drafter', icon: 'email-edit-outline', color: '#8B5CF6', description: 'Draft professional emails to parents or students.' },
];

const TeacherAIScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: '1', role: 'assistant', content: "Hello! I'm your Base10 AI Assistant. How can I help you manage your classes today?" }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newUserMsg = { id: Date.now().toString(), role: 'user', content: message };
    setChatHistory([...chatHistory, newUserMsg]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiRes = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: "I'm processing your request. As a teacher assistant, I can help you with lesson plans, grading rubrics, or student analysis. Which would you like to focus on?" 
      };
      setChatHistory(prev => [...prev, aiRes]);
    }, 1000);
  };

  const renderChatItem = ({ item }: any) => (
    <View style={[
      styles.messageBubble,
      item.role === 'user' ? styles.userBubble : styles.assistantBubble
    ]}>
      <Text style={[
        styles.messageText,
        item.role === 'user' ? styles.userMessageText : styles.assistantMessageText
      ]}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>AI Assistant</Text>
          <Text style={styles.subtitle}>Your co-pilot for class management</Text>
        </View>
        <View style={styles.aiBadge}>
          <MaterialCommunityIcons name="robot" size={20} color={AppColors.primary} />
        </View>
      </View>

      <View style={styles.toolsContainer}>
        <Text style={styles.sectionTitle}>Quick Tools</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.toolsList}>
          {AI_TOOLS.map(tool => (
            <TouchableOpacity key={tool.id} style={styles.toolCard}>
              <View style={[styles.toolIconContainer, { backgroundColor: tool.color + '20' }]}>
                <MaterialCommunityIcons name={tool.icon as any} size={24} color={tool.color} />
              </View>
              <Text style={styles.toolTitle}>{tool.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={chatHistory}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me to generate a lesson plan..."
          placeholderTextColor={AppColors.slate500}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]} 
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Ionicons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 13,
    color: AppColors.slate500,
    fontWeight: '500',
  },
  aiBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: AppColors.slate950,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  toolsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFF',
    marginHorizontal: 24,
    marginBottom: 12,
  },
  toolsList: {
    paddingHorizontal: 24,
    gap: 12,
  },
  toolCard: {
    backgroundColor: AppColors.slate950,
    padding: 16,
    borderRadius: 20,
    width: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  toolIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  toolTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
  chatContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: AppColors.slate950,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: AppColors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  assistantMessageText: {
    color: AppColors.slate200,
    fontWeight: '500',
  },
  userMessageText: {
    color: '#FFF',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: AppColors.background,
    borderTopWidth: 1,
    borderTopColor: AppColors.slate900,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: AppColors.slate950,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    color: '#FFF',
    fontSize: 15,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: AppColors.slate800,
  },
});

export default TeacherAIScreen;

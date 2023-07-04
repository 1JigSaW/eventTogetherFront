import React, {useContext} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {useUserMessages} from '../queries/chat';
import {UserContext} from '../../App';
import {Text} from 'react-native';

type Props = StackScreenProps<HomeStackParamList, 'MessageScreen'>;

function MessageScreen() {
  // получите userId из props
  const {user} = useContext(UserContext);
  const {data: messages, isLoading, error} = useUserMessages(user);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          <p>{message.content}</p>
          <small>
            From: {message.sender}, To: {message.receiver}
          </small>
        </div>
      ))}
    </div>
  );
}

export default MessageScreen;

import React from 'react';
import {View, TextInput, StyleSheet, Keyboard, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // using built-in icon

type SearchBarProps = {
    query: string;
    setQuery: (text: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
    const router = useRouter(); // For navigation

    const handleSubmit = () => {
        Keyboard.dismiss();
        if (query.trim() !== '') {
            router.push('/search'); // Go to the Search page
        }
    };

    return (
        <View style={styles.wrapper}>
            <TextInput
                style={styles.input}
                placeholder="Search sounds..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSubmit} // Triggers on Enter
                returnKeyType="search"
                placeholderTextColor="#aaa"
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Ionicons name="search" size={20} color="#333" />
            </TouchableOpacity>
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 10,
    },
    button: {
        padding: 8,
        marginLeft: 8,
        backgroundColor: '#ccc',
        borderRadius: 6,
    },
});

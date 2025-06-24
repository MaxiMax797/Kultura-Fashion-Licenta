import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// status initial + optiuni cu raspunsuri
const initialState = {
  isOpen: false,
  messages: [
    { 
      id: 1, 
      text: "Buna, bine ati venit la Kultura Fashion! Sunt Max Bot. Cu ce va pot ajuta?", 
      sender: 'bot' 
    }
  ],
  options: [
    { 
      id: 1, 
      text: "Ce e nou in stoc?",
      response: "Tocmai am primit cea mai noua colectie de sepci de vara de la brand-ul New Era!"
    },
    { 
      id: 2, 
      text: "Oferiti reduceri?",
      response: "Da! Insa momentan nu avem nicio reducere sezoniera. Ramaneti conectat! De asemenea, oferim o reducere de 10% la prima achizitie cand va inscrieti la newsletter-ul nostru."
    },
    { 
      id: 3, 
      text: "Care este politica de returnare?",
      response: "Oferim o politica de returnare de 30 de zile pentru articolele nepurtate in ambalajul original. Pentru mai multe detalii, puteti sa intrati in legatura cu serviciul de informatii."
    },
    {
      id: 4,
      text: "Cum imi pot urmari comanda?",
      response: "Puteti sa va urmariti comanda mergand la sectiunea 'Comenzile Mele' din contul vostru. Acolo veti gasi toate detaliile comenzii inclusiv informatiile de urmarire."
    },
    {
      id: 5,
      text: "Cum va pot contacta?",
      response: "Puteti suna la urmatorul telefon: 0761462991. Programul de lucru cu publicul este de luni pana vineri, intre orele 08:00 - 20:00."
    }
  ],
  status: 'idle',
  error: null
};

// Se poate folosi si cu API
export const sendMessageAsync = createAsyncThunk(
  'chatbot/sendMessage',
  async (message, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      return { message };

    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error sending message');
    }
  }
);


const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {

    toggleChatbot: (state) => {
      state.isOpen = !state.isOpen;
    },
    

    openChatbot: (state) => {
      state.isOpen = true;
    },
    

    closeChatbot: (state) => {
      state.isOpen = false;
    },
    

    addUserMessage: (state, action) => {
      state.messages.push({
        id: state.messages.length + 1,
        text: action.payload,
        sender: 'user'
      });
    },
    

    addBotMessage: (state, action) => {
      state.messages.push({
        id: state.messages.length + 1,
        text: action.payload,
        sender: 'bot'
      });
    },
    

    clearChat: (state) => {
      state.messages = [state.messages[0]]; // Ramane doar mesajul de Bun venit
    },
    

    resetChatbotStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
      })
      .addCase(sendMessageAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  }
});


export const {
  toggleChatbot,
  openChatbot,
  closeChatbot,
  addUserMessage,
  addBotMessage,
  clearChat,
  resetChatbotStatus
} = chatbotSlice.actions;


export const selectChatbotIsOpen = (state) => state.ChatbotSlice.isOpen;
export const selectChatbotMessages = (state) => state.ChatbotSlice.messages;
export const selectChatbotOptions = (state) => state.ChatbotSlice.options;
export const selectChatbotStatus = (state) => state.ChatbotSlice.status;
export const selectChatbotError = (state) => state.ChatbotSlice.error;

export default chatbotSlice.reducer;
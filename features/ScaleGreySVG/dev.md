          
          import { Platform, View } from "react-native";
          
          ...Platform.select({
            native: [{ scale: scale }],
            default: []
          })
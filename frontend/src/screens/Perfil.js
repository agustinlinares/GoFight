import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { getUserProfile, getGamificaciones,actualizarPerfil} from '../services/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';
import { Image } from 'react-native';
import Button from '../components/Button';
import { Modal } from 'react-native';
import TextInput from '../components/TextInput';
const Perfil = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [perfil, setPerfil] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');//Vamos a actualizar la contraseña del usuario,en caso de que quiera cambiarlo
    const [newNombre, setNewNombre] = useState('');//Vamos a actualizar el nombre del usuario,en caso de que quiera cambiarlo
    const [newEmail, setNewEmail] = useState('');//Vamos a actualizar el email del usuario,en caso de que quiera cambiarlo
    const [gamificaciones, setGamificaciones] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileData, gamData] = await Promise.all([
                    getUserProfile(),
                    getGamificaciones(),
                ]);
                setPerfil(profileData);
                setGamificaciones(gamData);
            } catch (error) {
                console.error('Error al obtener los datos del perfil:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.replace('login');
    };
  const handleChangeProfile=async()=>{
            const nombreActual=perfil?.perfilUsuario?.nombre || '';
             const emailActual=perfil?.perfilUsuario?.email || '';

             const nombreFinal=newNombre.trim()!== '' ? newNombre : nombreActual;
             const emailFinal=newEmail.trim()!== '' ? newEmail : emailActual;
          //No traemos la contraseña actual por motivos de seguridad y porque el usuario cualquier usuario no debería tener acceso a la contraseña actual,ya que es un dato sensible,por lo tanto,si el usuario quiere actualizar su contraseña,puede ingresar una nueva contraseña,pero no puede ver la contraseña actual,lo cual es una ventaja de seguridad
      try {
           await actualizarPerfil(
            nombreFinal,
            emailFinal,
            newPassword.trim()!== '' ? newPassword : undefined
           )
           alert('Perfil actualizado exitosamente');
          console.log('Datos a actualizar:', { nombreFinal, emailFinal, newPassword });
          //El usuario puede actualizar su nombre,email y contraseña,si no quiere actualizar alguno de esos campos,puede dejarlo vacío y se mantendrá el valor actual,ya que en el servicio de actualizarPerfil,si el campo está vacío,se mantiene el valor actual,lo cual es una ventaja para el usuario,ya que no tiene que llenar todos los campos si solo quiere actualizar uno o dos campos

          // Aquí podrías mostrar un mensaje de éxito al usuario
      } catch (error) {
          console.error('Error al actualizar el perfil:', error);
          //En caso de error, podrías mostrar un mensaje de error al usuario
          // Aquí podrías mostrar un mensaje de error al usuario
      } finally {
          setModalVisible(false);
          setNewNombre('');
          setNewEmail('');
          setNewPassword('');
      }
  }
    if (loading) {
        return (
            <View style={styles.LoadingContainer}>
                <ActivityIndicator size="large" color="#FF2233" />
            </View>
        );
    }

    const nombre = perfil?.perfilUsuario?.nombre || 'Usuario';
    const email = perfil?.perfilUsuario?.email || '—';
    const tipoPerfil = perfil?.perfilUsuario?.perfil || '—';
    const racha = gamificaciones?.gamificaciones?.racha_dias ?? 0;
    const puntos = gamificaciones?.gamificaciones?.puntos_ranking ?? 0;

    return (
        <SafeAreaView style={styles.Container}>
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.ModalContainer}>
                <View style={styles.ModalContent}>
                    <Text style={styles.ModalTitle}>Actualizar perfil</Text>
                    <TextInput
                        style={styles.ModalInput}
                        placeholder="Nuevo nombre"
                        value={newNombre}
                        onChangeText={setNewNombre}
                         iconName="person-outline"
                        
                    />
                    <TextInput
                        style={styles.ModalInput}
                        placeholder="Nuevo email"
                        value={newEmail}
                        onChangeText={setNewEmail}
                         iconName="address-card-outline"
                       
                    />
                    <TextInput
                        style={styles.ModalInput}
                        placeholder="Nueva contraseña"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                        iconName="lock-outline"
                    />
                    <Button title="Guardar" onPress={handleChangeProfile} />
                    <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                </View>
            </View>
        </Modal>
            <ScrollView contentContainerStyle={styles.ScrollContent} showsVerticalScrollIndicator={false}>

                {/* Header de perfil */}
                <View style={styles.ProfileHeader}>
                  <View style={styles.AvatarWrapper}>
  {perfil?.perfilUsuario?.perfil ? (
    <Image
      source={{ uri: perfil.perfilUsuario.perfil }}
      style={styles.AvatarImage}
    />
  ) : (
    <Ionicons name="person-circle" size={90} color="#FF2233" />
  )}
</View>
                    <Text style={styles.NombreText}>{nombre}</Text>
                    
                </View>

                {/* Info personal */}
                <View style={styles.Section}>
                    <Text style={styles.SectionTitle}>Información personal</Text>

                    <View style={styles.InfoRow}>
                        <MaterialCommunityIcons name="email-outline" size={20} color="#FF2233" />
                        <Text style={styles.InfoLabel}>Email</Text>
                        <Text style={styles.InfoValue}>{email}</Text>
                    </View>

                    <View style={styles.Divider} />

                    <View style={styles.InfoRow}>
                        <Ionicons name="key-outline" size={20} color="#FF2233" />
                        <Text style={styles.InfoLabel}>Contraseña</Text>
                        <Text style={styles.InfoValue}>********</Text>
                       
                    </View>
                      <View>
                          <Button title="Actualizar perfil" onPress={() => setModalVisible(true)} />
                           
                        </View>
                </View>

                {/* Stats */}
                <View style={styles.Section}>
                    <Text style={styles.SectionTitle}>Mis estadísticas</Text>
                    <View style={styles.StatsRow}>

                        <View style={styles.StatCard}>
                            <Ionicons name="flame" size={30} color="#ff4500" />
                            <Text style={styles.StatValue}>{racha}</Text>
                            <Text style={styles.StatLabel}>Días de racha</Text>
                        </View>

                        <View style={styles.StatCard}>
                            <FontAwesome name="star" size={30} color="#fee500" />
                            <Text style={styles.StatValue}>{puntos}</Text>
                            <Text style={styles.StatLabel}>Puntos</Text>
                        </View>

                    </View>
                </View>

                {/* Botón cerrar sesión */}
                <TouchableOpacity style={styles.LogoutButton} onPress={handleLogout} activeOpacity={0.8}>
                    <MaterialCommunityIcons name="logout" size={20} color="white" />
                    <Text style={styles.LogoutText}>Cerrar sesión</Text>
                </TouchableOpacity>

            </ScrollView>

            <Footer navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    ModalContainer:{
       backfaceVisibility:'hidden',
        justifyContent:'center',
       alignItems:'center',
       bottom:0,
       top:0,
       left:0,
         right:0,
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        zIndex:10,
        
       

    },
    ModalContent:{
        width:'80%',
        backgroundColor:'#0F0F0F',
        padding:20,
        borderRadius:10,
        borderWidth:1,
        borderColor:'rgba(255,34,51,0.2)',
        shadowColor:'#FF2233',
        shadowOffset:{width:0,height:4},
        shadowOpacity:0.3,
        shadowRadius:15,
        elevation:8,
        gap:15,
    },
    ModalTitle:{
        fontSize:18,
        fontWeight:'700',
        color:'#ffffff',
        textShadowColor:'rgba(255,34,51,0.5)',
        textShadowOffset:{width:0,height:2},
        textShadowRadius:10,
        fontFamily:'Helvetica',
        letterSpacing:1,
        textTransform:'uppercase',
        marginBottom:15,
    },
    
    LoadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#080808',
    },
    Container: {
        flex: 1,
        backgroundColor: '#080808',
        justifyContent: 'space-between',
    },
    ScrollContent: {
        padding: 20,
        gap: 20,
    },

    // Header avatar
    ProfileHeader: {
        alignItems: 'center',
        paddingVertical: 30,
        borderRadius: 20,
        backgroundColor: '#0F0F0F',
        borderWidth: 1,
        borderColor: 'rgba(255, 34, 51, 0.2)',
        shadowColor: '#FF2233',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    AvatarWrapper: {
        marginBottom: 10,
    },
    NombreText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#ffffff',
        textShadowColor: 'rgba(255, 34, 51, 0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10,
        fontFamily: 'Helvetica',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    TipoText: {
        marginTop: 6,
        fontSize: 10,
        color: '#FF2233',
        letterSpacing: 2.5,
        fontFamily: 'Helvetica',
        textTransform: 'uppercase',
    },

    // Secciones
    Section: {
        backgroundColor: '#0F0F0F',
        borderRadius: 20,
        padding: 18,
        borderWidth: 1,
        borderColor: 'rgba(70, 34, 34, 0.4)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
        gap: 12,
    },
    SectionTitle: {
        fontSize: 11,
        color: '#888',
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontFamily: 'Helvetica',
        marginBottom: 4,
    },

    // Fila de info
    InfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    InfoLabel: {
        color: '#888',
        fontSize: 13,
        flex: 1,
        fontFamily: 'Helvetica',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    InfoValue: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'Helvetica',
        letterSpacing: 0.5,
    },
    Divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
    },

    // Stats
    StatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 15,
    },
    StatCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 15,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: '#484141',
        gap: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
    },
    StatValue: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: '700',
        textShadowColor: 'rgba(255, 34, 51, 0.4)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
        letterSpacing: 1,
    },
    StatLabel: {
        color: '#888',
        fontSize: 9,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        fontFamily: 'Helvetica',
        textAlign: 'center',
    },

    // Logout
    LogoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF2233',
        borderRadius: 14,
        paddingVertical: 16,
        gap: 10,
        shadowColor: '#FF2233',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
        marginBottom: 10,
    },
    LogoutText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontFamily: 'Helvetica',
    },
    AvatarImage: {
  width: 90,
  height: 90,
  borderRadius: 45,
  borderWidth: 2,
  borderColor: '#FF2233',
},
});

export default Perfil;
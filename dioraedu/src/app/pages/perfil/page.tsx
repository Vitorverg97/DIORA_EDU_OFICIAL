import React from 'react';
import Image from 'next/image';

const Perfil: React.FC = () => {
  return (
    <div style={{ background: '#BDE3FA', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Topbar */}
      <div style={{
        background: '#0A2E4B',
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/assets/icone-cerebro.svg" 
          alt="DioraEDU" 
          height={32} 
          width={32}/>
          <span style={{ color: '#ffd13b', fontWeight: 700, fontSize: 22, fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>DioraEdu</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', background: '#867e6a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 22, height: 3, background: '#fff', borderRadius: 2, margin: '2px 0' }} />
            <div style={{ width: 22, height: 3, background: '#fff', borderRadius: 2, margin: '2px 0' }} />
            <div style={{ width: 22, height: 3, background: '#fff', borderRadius: 2, margin: '2px 0' }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, padding: '0 60px' }}>
        {/* Left: Profile */}
        <div>
          <button
            style={{
              background: '#ffd13b',
              color: '#2d2a24',
              border: '2px solid #b08f00',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 32,
              padding: '8px 32px',
              marginBottom: 24,
              boxShadow: '2px 2px 0 #b08f00',
              cursor: 'pointer',
            }}
            disabled
          >
            Aluno
          </button>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                overflow: 'hidden',
                marginBottom: 16,
                border: '4px solid #52483a'
              }}
            >
              <Image
                src="/assets/Picture-profile.png"
                alt="Perfil"
                width={200}
                height= {200}
              />
            </div>
            <div
              style={{
                background: '#52483a',
                color: '#fff',
                borderRadius: 16,
                fontWeight: 700,
                fontSize: 28,
                padding: '6px 26px',
                boxShadow: '2px 2px 0 #2d2a24'
              }}
            >
              Antonio Stark
            </div>
          </div>
        </div>

        {/* Right: Statistics */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            style={{
              background: '#52483a',
              color: '#fff',
              fontWeight: 700,
              fontSize: 20,
              borderRadius: 10,
              border: 'none',
              padding: '10px 36px',
              marginBottom: 24,
              boxShadow: '2px 2px 0 #2d2a24',
              cursor: 'pointer'
            }}
            disabled
          >
            Estatísticas
          </button>
          <div
            style={{
              background: '#f2f2f2',
              border: '2px solid #52483a',
              borderRadius: 18,
              width: 320,
              boxShadow: '3px 3px 0 #2d2a24',
              padding: '28px 0 22px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <span style={{
              color: '#52483a',
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 24
            }}>
              Pontuação
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <span style={{
                  background: '#ffd13b',
                  color: '#2d2a24',
                  border: '2px solid #b08f00',
                  borderRadius: 16,
                  fontWeight: 700,
                  padding: '4px 18px',
                  fontSize: 16,
                  minWidth: 106,
                  textAlign: 'center'
                }}>
                  Matemática:
                </span>
                <span style={{
                  background: '#ffd13b',
                  color: '#2d2a24',
                  border: '2px solid #b08f00',
                  borderRadius: 16,
                  fontWeight: 700,
                  padding: '4px 20px',
                  fontSize: 16,
                  minWidth: 60,
                  textAlign: 'center'
                }}>
                  79pts
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <span style={{
                  background: '#ffd13b',
                  color: '#2d2a24',
                  border: '2px solid #b08f00',
                  borderRadius: 16,
                  fontWeight: 700,
                  padding: '4px 18px',
                  fontSize: 16,
                  minWidth: 106,
                  textAlign: 'center'
                }}>
                  Português:
                </span>
                <span style={{
                  background: '#ffd13b',
                  color: '#2d2a24',
                  border: '2px solid #b08f00',
                  borderRadius: 16,
                  fontWeight: 700,
                  padding: '4px 20px',
                  fontSize: 16,
                  minWidth: 60,
                  textAlign: 'center'
                }}>
                  100pts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: 'white',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 36px'
      }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <Image src="/assets/home-example.png" 
          alt="Início" 
          width={34}
          height={34}
          />
          <Image src="/assets/Books-example.png" 
          alt="Biblioteca" 
          width={34}
          height={34}
          />
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Image src="/assets/heart-example.png" 
            alt="Vidas" 
            width={34}
            height={34}
            />
            <span style={{
              position: 'absolute',
              top: -6,
              right: -14,
              background: '#d8062e',
              color: '#fff',
              borderRadius: '50%',
              fontWeight: 700,
              fontSize: 16,
              width: 26,
              height: 26,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #52483a'
            }}>5</span>
          </div>
          <Image src="/assets/profile-example.png"
            alt="Perfil"
            width={34}
            height={34}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{
            color: '#fff',
            fontSize: 16,
            marginRight: 8
          }}>Baixe o app DioraEDU</span>
          <Image src="/assets/app-store.png" 
          alt="App Store"
          width= {108}
          height= {32}
          style={{marginRight: 4 }} />
          
          <Image src="/assets/google-play.png"
           alt="Google Play"
           width= {108}
           height= {32}
          />
        </div>
      </div>

      {/* Chat Button */}
      <div style={{
        position: 'fixed',
        right: 32,
        bottom: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          background: '#fff',
          border: '2px solid #52483a',
          borderRadius: '50%',
          width: 54,
          height: 54,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
          boxShadow: '2px 2px 0 #2d2a24'
        }}>
          <Image src="/assets/Chat-balloon.png" 
          alt="Chat"
          width= {50}
          height= {55}
          />
        </div>
        <span style={{
          background: '#fff',
          color: '#52483a',
          fontWeight: 700,
          padding: '2px 10px',
          borderRadius: 12,
          border: '2px solid #52483a',
          fontSize: 16,
          boxShadow: '2px 2px 0 #2d2a24'
        }}>
          Chat
        </span>
      </div>
    </div>
  );
};

export default Perfil;
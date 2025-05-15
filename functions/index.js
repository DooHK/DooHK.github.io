const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { SolapiMessageService } = require('solapi'); // 올바른 import 인지 확인 필요
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();

// Solapi 인증 정보
const apiKey = 'NCSPGVNKEHWM8PPG';
const apiSecret = 'MOLDBHNQGW1SYJCS3H1TDJX32RULHTPP';

// Solapi 메시지 서비스 초기화
const messageService = new SolapiMessageService(apiKey, apiSecret);

exports.sendRequest = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // 요청 검증
    if (req.method !== 'POST') {
      return res.status(405).json({ message: '허용되지 않는 메소드입니다.' });
    }

    const { name, myPhone, targetPhone } = req.body;
    
    // 필수 파라미터 검증
    if (!name || !myPhone || !targetPhone) {
      return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }

    try {
      console.log(`요청 시작: name=${name}, myPhone=${myPhone}, targetPhone=${targetPhone}`);
      
      const match = await db.collection('requests')
        .where('myPhone', '==', targetPhone)
        .where('targetPhone', '==', myPhone)
        .get();

      if (!match.empty) {
        console.log('매칭된 요청 찾음, 문자 발송 시도');
        
        const matchData = match.docs[0].data();
        
        // 내 번호로 상대방 이름으로 기다린다는 메시지 전송
        const resultToMe = await messageService.sendOne({
          to: myPhone,
          from: '01082410313',
          text: `${matchData.name}님이 당신을 기다리고 있어요!`
        });
        
        // 상대방 번호로 내 이름으로 기다린다는 메시지 전송
        const resultToTarget = await messageService.sendOne({
          to: targetPhone,
          from: '01082410313',
          text: `${name}님이 당신을 기다리고 있어요!`
        });
        
        console.log('내 번호로 문자 발송 결과:', resultToMe);
        console.log('상대방 번호로 문자 발송 결과:', resultToTarget);
        
        res.json({ 
          message: '양쪽 모두에게 문자를 보냈습니다.',
          resultToMe: resultToMe,
          resultToTarget: resultToTarget
        });
      } else {
        console.log('매칭된 요청 없음, DB에 요청 저장');
        
        // 새 요청 저장
        const docRef = await db.collection('requests').add({ 
          name, 
          myPhone, 
          targetPhone,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        console.log('저장된 문서 ID:', docRef.id);
        res.json({ 
          message: '요청이 저장되었습니다. 상대방이 등록하면 문자 전송됩니다.',
          requestId: docRef.id
        });
      }
    } catch (error) {
      console.error('오류 발생:', error);
      res.status(500).json({ 
        message: '서버 오류 발생', 
        error: error.message,
        stack: error.stack
      });
    }
  });
});
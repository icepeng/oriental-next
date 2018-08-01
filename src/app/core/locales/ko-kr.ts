// tslint:disable:max-line-length

export const cards = require('./ko-kr.cards.json');

export const expansions = {
    'the-witchwood': {
        imgLink:
            'https://d2q63o9r0h0ohi.cloudfront.net/images/the-witchwood/ko-kr/logo-9a6008a3b848d29b3d867fe58181ab2302be09f3413221ea4cdc8722399545171f7898d206c8917ac5762dd71eb144c1eb7183a75228a09e9c9b49436b487747.png',
        name: '마녀숲',
        heading: '사악한 무언가가 다가온다, 이곳으로',
        text:
            '쉿, 용감한 영웅들이여 조심하십시오. 위험한 땅에 발을 딛고 있습니다. 사그라지는 빛과 엄습하는 그림자들이 보이십니까? 마녀숲이 부르고 있지만, 전 이렇게 애원합니다. 보물을 찾으러 가지 마십시오! 안전한 이곳에 머물면서, 의자를 끌어와 앉고 다시 한판 벌입시다! 당신은 결정을 내리셨군요. 제발 제 간청에 귀 기울여주십시오. 덱은 가까운 곳에 두고, 예리한 판단력은 절대 잃지 마십시오… 마녀숲이 당신의 파멸이 되지 않기를!',
    },
    'boomsday-project': {
        imgLink:
            'https://d2q63o9r0h0ohi.cloudfront.net/images/the-boomsday-project/ko-kr/logo-833c15ebac3668ec08ab3cc98d26c59dc635705af87309f4181b5f1b7922546082ca4b699b25e311301a42ec3dffb4c65b939654832a36fa0fd9ff75c5209523.png',
        name: '박사 붐의 폭심만만 프로젝트',
        heading: '과학을 위하여!',
        text:
            '바람을 타고 흐르는 전율, 코를 찌르는 오존과 코륨, 먼 곳의 폭발이 일으키는 진동이 느껴지시나요? 과학이 우리를 에워싸고 있습니다! 여관에서 들리는 바로는 박사 붐이 황천의 폭풍 깊숙한 곳에 숨겨진 그의 비밀 연구소로 돌아왔다고 합니다. 정신 나간 천재 박사가 이번에는 어떤 발명품을 세상에 공개할지 아무도 모릅니다. 하지만 최근 들어 기묘한 기계, 기괴한 수정, 연구소에서 배양된 끔찍한 괴생명체와 같은 아주 수상한 카드들이 주변 손님들의 덱에서 발견되었다고 합니다. 훌륭한 박사와 그의 저명한 동료들이 위대한 무언가를 계획하고 있는 것이 분명합니다! 어서 황천의 폭풍으로 떠나, 연구소를 찾고 과학도들이 어떤 연구에 심취해있는지 밝혀냅시다!',
    },
};

export const propName = {
    power: {
        20: '매우 낮음',
        40: '낮음',
        60: '높음',
        80: '매우 높음',
    },
    generality: {
        20: '순수 시너지형',
        40: '중립적 시너지형',
        60: '중립적 단독형',
        80: '순수 단독형',
    },
    fun: {
        20: '매우 낮음',
        40: '낮음',
        60: '높음',
        80: '매우 높음',
    },
    balance: {
        20: '매우 나쁨',
        40: '나쁨',
        60: '좋음',
        80: '매우 좋음',
    },
};

export const ui = {
    'the-witchwood': '마녀숲',
    'boomsday-project': '박사붐의 폭심만만 프로젝트',
    Surveys: '설문',
    'Survey List': '설문 목록',
    'Write Survey': '설문 작성',
    Expansions: '확장팩',
    Expansion: '확장팩',
    Cards: '카드',
    'Card List': '카드 목록',
    About: '정보',
    Class: '직업',
    Cost: '코스트',
    Rarity: '레어도',
    Sort: '정렬',
    Order: '순서',
    ALL: '모두',
    Ongoing: '진행중',
    Closed: '종료',
    List: '목록',
    'Starting Guide': '사전 가이드',
    Review: '검토',
    Summary: '요약',
    Responses: '평가',
    'Unanswered Only': '미응답만 표시',
    'Pre-Release': '사전 평가',
    'After-Release': '출시후 평가',
    YES: '예',
    NO: '아니오',
    DRUID: '드루이드',
    HUNTER: '사냥꾼',
    MAGE: '마법사',
    PALADIN: '성기사',
    PRIEST: '사제',
    ROGUE: '도적',
    SHAMAN: '주술사',
    WARLOCK: '흑마법사',
    WARRIOR: '전사',
    NEUTRAL: '중립',
    LEGENDARY: '전설',
    EPIC: '영웅',
    RARE: '희귀',
    COMMON: '일반',
    'Card Power': '카드 파워',
    Generality: '카드 유형',
    Description: '추가 설명',
    Fun: '재미',
    Balance: '밸런스',
};

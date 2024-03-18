export {}
declare global{
    type GameI={gameId: string, type: number|string, code: string, name: string, vndArea: string}
    export interface AwardBet {
        awardPeriod:    string;
        betInfos:       BetInfo[];
        gameCode:       string;
       /* merchantMember: MerchantMember;
        merchanteId:    number;*/
    }

    export interface BetInfo {
        betNums:          string[];
        gamePlayCode:     string;
        gamePlayTypeCode: string;
        oneBetAmount:     number;
        sumAmount:        number;
    }

    export interface MerchantMember {
        createdAt:     string;
        creator:       string;
        id:            number;
        merchantId:    number;
        plantformId:   number;
        status:        number;
        thirdPartyUid: string;
        updatedAt:     string;
        updater:       string;
        userName:      string;
    }
}

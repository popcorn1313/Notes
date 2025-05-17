# Bitcoin
## Introduction
- general : 
    - "Bitcoin" as a system or technology
    - "bitcoin" as the currency units (usually single)
- feature : 
    - 去中心化：沒有中央銀行或機構管理，所有交易都透過全球的電腦網路驗證。
    - 區塊鏈技術：所有交易都記錄在 公開的分散式帳本（區塊鏈）上，確保透明性與安全性。
    - 有限供應：比特幣的總供應量被限制在 2100 萬枚，這使得它類似於稀缺資源（如黃金）。
    - 挖礦（Mining）：透過 工作量證明（Proof of Work），礦工使用高效能電腦來解決數學問題，驗證交易並獲得比特幣獎勵
- [Bitcoin and Global Listed Companies Rankings](https://www.coinglass.com/global-assets)
- [Blockchain bitcoin explorer](https://www.blockchain.com/explorer)
- history : 
    - 比特幣的誕生並非憑空出現，而是建立在許多早期的 數位貨幣 和 密碼學技術 之上。這些技術和概念為比特幣的創造奠定了基礎，被視為比特幣的「前傳」
    - David Chaum 的 eCash（1983）
        - 美國密碼學家 David Chaum 提出了 匿名電子貨幣（eCash），希望創建一種不依賴銀行的數位支付系統。
        - 他在 1989 年創立 DigiCash，但未能成功普及。
    - Wei Dai 的 b-money（1998）
        - 密碼學家 Wei Dai 提出了 b-money，這是一種去中心化的數位貨幣概念，類似於比特幣的想法。
        - b-money 設計了一種 工作量證明（Proof of Work） 機制，但從未真正實現。
    - Nick Szabo 的 Bit Gold（1998）
        - Nick Szabo 提出了 Bit Gold，這是一種基於 計算工作量 來產生數位貨幣的系統。
        - Bit Gold 的設計與比特幣非常相似，但缺乏去中心化的交易驗證機制。
    - Adam Back 的 Hashcash（1997）
        - Adam Back 創建了 Hashcash，這是一種 工作量證明（PoW） 機制，最初用於防止垃圾郵件。
        - Hashcash 的 PoW 機制後來被比特幣採用。
    - 比特幣的誕生
        - 2008 年，中本聰（Satoshi Nakamoto） 發表了比特幣白皮書《Bitcoin: A Peer-to-Peer Electronic Cash System》，提出了一種 去中心化的數位貨幣。
        - 2009 年，比特幣正式推出，並且 創世區塊（Genesis Block） 被挖掘，標誌著比特幣網路的誕生
## Economic of Bitcoin
- 區塊獎勵（Block Rewards）
    - 區塊獎勵 是比特幣網路對礦工的獎勵，當礦工成功挖掘一個區塊並將其加入區塊鏈時，他們會獲得一定數量的比特幣作為獎勵。
    - 這個獎勵是比特幣的主要發行方式，直到所有 2100 萬枚比特幣被挖掘完畢。
    - 目前的區塊獎勵為 3.125 BTC，但它會隨著比特幣減半而降低。
- 比特幣減半（Bitcoin Halving）
    - 比特幣減半 是比特幣協議中的一個機制，每 210,000 個區塊（約 每四年）發生一次。
    - 每次減半時，礦工的區塊獎勵會減少 50%，這使得比特幣的供應速度逐漸減緩。
    - 例如：
        - 2009 年：區塊獎勵為 50 BTC
        - 2012 年：減半至 25 BTC
        - 2016 年：減半至 12.5 BTC
        - 2020 年：減半至 6.25 BTC
        - 2024 年：減半至 3.125 BTC
        - 2028 年預計：減半至 1.5625 BTC
- 減半的影響
    - 供應減少：比特幣的發行速度降低，增加稀缺性。
    - 價格波動：歷史上，每次減半後，比特幣價格通常會上漲，因為市場預期供應減少會推高價格。
    - 礦工收益下降：減半後，礦工的收入減少，可能導致部分礦工退出市場，影響比特幣網路的安全性。
## Keys and wallet address generation
- 生成私鑰（Private Key）
    - 私鑰 是一個 隨機生成的 256-bit 數字，通常使用 SHA-256 來確保安全性。
    - 這個私鑰是 絕對保密 的，擁有它就能控制對應的比特幣。
    - ~~~python
        import os
        import hashlib

        private_key = os.urandom(32) # 生成256 bit 隨機數
        print("Private key:", private_key.hex())
      ~~~
- 生成公鑰（Public Key）
    - 公鑰 是透過 橢圓曲線加密（Elliptic Curve Cryptography, ECC） 從私鑰計算出來的。
    - 比特幣使用 secp256k1 橢圓曲線 來生成公鑰
    - ~~~python
       from ecdsa import SigningKey, SECP256k1

        sk = SigningKey.from_string(private_key, curve=SECP256k1)
        public_key = sk.verifying_key.to_string()
        print("Public Key:", public_key.hex())
      ~~~
- 生成錢包地址（Wallet Address）
    - 公鑰經過 SHA-256 和 RIPEMD-160 哈希運算，產生 公鑰哈希（Public Key Hash）。
    - 然後使用 Base58Check 編碼 來生成 比特幣地址。
    - ~~~python
        import base58

        sha256_hash = hashlib.sha256(public_key).digest()
        ripemd160_hash = hashlib.new('ripemd160', sha256_hash).digest()
        wallet_address = base58.b58encode(ripemd160_hash).decode()
        print("Bitcoin Wallet Address:", wallet_address)
      ~~~
- 助記詞（Mnemonic Phrase）
    - 為了方便備份私鑰，比特幣錢包通常使用 BIP39 助記詞（12 或 24 個單詞）。
    - 助記詞可以轉換成私鑰，確保安全性。\
    - ~~~python
        from mnemonic import Mnemonic

        mnemo = Mnemonic(""english)
        mnemonic_phrase = mnemo.generate(strength=256)
        print("Mnemonic Phrase:", mnemonic_phrase)
      ~~~
- 安全性
    - 私鑰絕對不能洩漏，否則比特幣可能被盜。
    - 冷錢包（Cold Wallet）：將私鑰存放在 離線設備，避免網路攻擊。
    - 多重簽名（Multi-Signature）：需要多個私鑰才能執行交易，提高安全性。
- 備註：cold wallet & hot wallet
    - hot wallet
        - feature
            - 連接網路：熱錢包是 在線錢包，可以隨時存取和交易加密貨幣。
            - 方便交易：適合日常使用，例如購買商品或轉帳。
            - 安全性較低：由於熱錢包始終連接網路，容易受到駭客攻擊
        - type
            - 交易所錢包（如 Binance、Coinbase）
            - 軟體錢包（如 MetaMask、Trust Wallet）
            - 行動應用錢包（如 Exodus、Electrum）
    - cold wallet 
        - feature
            - 離線存儲：冷錢包不連接網路，因此更安全。
            - 適合長期存儲：適合存放大量加密貨幣，避免駭客攻擊。
            - 交易不便：每次交易需要手動連接設備。
        - type
            - 硬體錢包（如 Ledger、Trezor）
            - 紙錢包（將私鑰印在紙上）
            - 離線電腦錢包（在未連接網路的設備上運行）
## Transaction
- working flow
    - 交易發起
        - 使用者（例如 Alice）想要向 Bob 轉帳比特幣。
        - Alice 的錢包會選擇 未使用的交易輸出（UTXO） 作為交易的輸入。
        - Alice 指定 Bob 的比特幣地址作為交易的輸出。
    -  交易簽名
        - Alice 的錢包使用 私鑰 來簽署交易，確保交易的合法性。
        - 這個簽名可以透過 公鑰 來驗證，確保 Alice 擁有這些比特幣
    - 交易廣播
        - Alice 的錢包將交易廣播到比特幣網路，讓所有節點（礦工）看到這筆交易
    - 礦工驗證交易
        - 礦工會檢查交易是否有效（例如 UTXO 是否已被使用）。
        - 礦工透過 工作量證明（Proof of Work, PoW） 來競爭記錄交易
    - 交易被加入區塊
        - 成功驗證的交易會被打包進 區塊，並加入區塊鏈。
        - 一旦交易被確認，它就變得不可逆
    - 交易確認
        - 比特幣網路通常建議等待 6 次區塊確認，以確保交易不會被回滾。
        - Bob 的錢包會顯示收到比特幣，交易完成
- 備註：UTXO
    - idea
        - 是比特幣交易系統中的一個核心概念，它代表 未使用的交易輸出，即仍可用於未來交易的比特幣資金
    - working flow
        - 每筆交易的輸入來自先前的 UTXO（就像使用一張鈔票付款）。
        - 交易輸出產生新的 UTXO（就像收到找零）。
        - UTXO 只能完整使用，不能部分花費（如果你有 1 BTC，但只想支付 0.5 BTC，系統會創建兩個新的 UTXO：一個給收款人，另一個是你的找零
    - advantage
        - 提高隱私性：交易不直接關聯帳戶，而是基於 UTXO，使追蹤更困難。
        - 支持並行處理：不同 UTXO 可以獨立驗證，提高交易效率
- 備註：meaning of confirmation in Bitcoin
    - idea
        - 指的是交易被包含在區塊鏈中的次數。當你發送比特幣交易時，它首先會進入 未確認狀態，直到礦工將其加入區塊並驗證
    - flow
        - 交易廣播：當你發送比特幣交易時，它會被廣播到比特幣網路。
        - 礦工驗證：礦工會將交易打包進區塊，並透過 工作量證明（Proof of Work, PoW） 來競爭記錄交易。
        - 區塊鏈確認：
            - 1 次確認：交易被包含在最新的區塊中。
            - 6 次確認：交易被認為是安全的，幾乎不可能被回滾。
            - 更多確認：交易的安全性隨著區塊數量增加而提高。
    - importance
        - 防止雙重支付（Double Spending）：交易確認後，攻擊者無法重複使用相同的比特幣。
        - 提高交易安全性：交易確認次數越多，被回滾的可能性越低。
        - 影響交易速度：比特幣區塊約 每 10 分鐘 產生一次，因此交易確認可能需要 數十分鐘到數小時。
## Blockchain and mining
- block reward 主要為交易手續費以及區塊獎勵
- Merkle Tree（默克爾樹）是一種 樹狀資料結構，主要用於 區塊鏈技術，確保交易資料的完整性和安全性。它透過 哈希函數（Hash Function） 來組織和驗證交易資料，使得區塊鏈能夠高效運作
    - working flow 
        - 交易資料哈希化：每筆交易都會經過 SHA-256 或其他加密哈希函數，產生唯一的哈希值。
        - 哈希值兩兩合併：將相鄰的交易哈希值合併後，再次進行哈希運算，形成新的節點。
        - 重複合併直到產生 Merkle Root：最終只剩下一個哈希值，稱為 Merkle Root，它代表所有交易的唯一摘要。
    - effect
        - 提高驗證效率：節點只需檢查 Merkle Root，而不必驗證所有交易。
        - 確保資料完整性：任何交易被篡改，Merkle Root 也會改變，確保區塊鏈的安全性。
        - 支持輕量級驗證（SPV）：使用者可以透過 Merkle Proof 驗證交易，而不必下載整個區塊鏈。
- mining difficulty 是比特幣網路用來調整工作量證明（Proof of Work, PoW）計算難度的機制，確保區塊產生時間保持穩定
    - working flow
        - 每 2016 個區塊（約兩週）調整一次，根據過去區塊的挖掘速度來決定是否提高或降低難度。
        - 目標區塊時間為 10 分鐘，如果區塊產生速度過快，難度會上升；如果太慢，難度會下降。
        - 礦工必須找到符合難度要求的哈希值，才能成功挖掘區塊並獲得獎勵(一般來說是找到末幾碼為0的 hash value)
    - factor
        - 網路算力（Hashrate）：如果更多礦工加入，算力增加，難度也會提高。
        - 礦機效能：更高效的礦機能夠更快解出 PoW，影響難度調整。
        - 市場狀況：比特幣價格上漲時，更多礦工投入挖礦，導致難度上升
    - importance
        - 防止比特幣過快發行，確保供應穩定。
        - 維持網路安全，避免惡意攻擊（如 51% 攻擊）。
        - 確保公平競爭，讓所有礦工都能參與挖礦
## Attack
- Sybil 攻擊（Sybil Attack） 是一種 網路安全攻擊，攻擊者透過 創建大量假身份 來操控去中心化網路，例如區塊鏈或 P2P 網路
    - way of attack
        - 攻擊者創建多個假節點，讓它們看起來像是獨立的使用者。
        - 這些假節點控制網路決策，例如影響共識機制或投票結果。
        - 可能導致網路崩潰，例如在區塊鏈中，攻擊者可能試圖影響交易驗證或執行惡意行為。
    - effect
        - 影響區塊鏈安全性：攻擊者可能試圖影響交易驗證或共識機制。
        - 操控社群平台：例如在社交媒體上，假帳號可以影響輿論或選舉結果。
        - 破壞 P2P 網路：攻擊者可能透過假節點影響檔案共享或資料傳輸。
    - prevention
        - 工作量證明（PoW）：比特幣使用 PoW 來確保節點必須投入計算資源，降低攻擊成本。
        - 權益證明（PoS）：透過持有加密貨幣來驗證交易，確保節點有經濟動機維護網路。
        - 身份驗證機制：某些網路要求使用者提供身份驗證，以防止大量假帳號
- double spending
    - 是指 同一筆數位貨幣被多次使用，這在傳統金融系統中幾乎不可能發生，但在 數位貨幣（如比特幣）中可能成為問題。
    - 雙重支付的方式
        - 直接攻擊（Race Attack）
            - 攻擊者向商家支付比特幣，但在交易確認前，向另一個地址發送相同的比特幣。
            - 如果第二筆交易先被確認，商家就會收到無效的付款。
        - 51% 攻擊（Majority Attack）
            - 如果某個礦工或礦池控制了 超過 50% 的算力，他們可以 重組區塊鏈，使已確認的交易失效，並將比特幣重新發送給自己。
        - Finney Attack
            - 攻擊者先挖掘一個區塊，然後使用未確認的交易來欺騙商家，讓商家接受未確認的比特幣。
    - 避免雙重支付
        - 區塊鏈記錄所有交易，確保每筆交易只能被確認一次。
        - 礦工驗證交易，確保交易不會被惡意修改。
        - 等待多個區塊確認（例如 6 次確認），降低交易被回滾的風險。










































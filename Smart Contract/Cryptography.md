# Information and network security 
## Cybersecurity
- CIA triad
    - confidentiality 
        - 確保只有授權使用者可以存取資料，防止未經許可的存取或洩露。
        - 加密技術 → 使用 AES、RSA、TLS 等加密方法來保護數據。
        - 存取控制 → 透過 身份驗證（Authentication） 和 存取權限（Access Control） 來確保數據安全
    - integrity
        - 確保數據不被未授權修改，防止惡意篡改或損毀。
        - 數據校驗 → 使用 哈希函數（如 SHA-256） 來驗證數據完整性。
        - 審計與監控 → 透過日誌記錄確保系統沒有被未授權篡改。
    - availability
        - 確保系統和數據始終可用，即使遭受攻擊或故障。
        - 備援與容錯 → 透過 高可用性架構（HA）、負載平衡 來確保系統穩定。
        - 防禦 DDoS 攻擊 → 透過 防火牆、流量過濾 來保護服務。
## Symmetric ciphers
- general : 是一種 加密和解密都使用相同密鑰 的加密技術，適用於資料保護、通訊加密等應用。
- principle : 
    - 加密（Encryption）
        - 使用者輸入明文（Plaintext）
        - 使用密鑰（Key） 透過加密演算法處理資料
        - 產生密文（Ciphertext），這是無法直接讀取的加密數據
    - 解密（Decryption）
        - 使用相同的密鑰
        - 透過解密演算法將密文還原為明文
- commom algorithm : 
    - AES（Advanced Encryption Standard） → 現在最常用，安全性高
    - DES（Data Encryption Standard） → 早期用於金融系統，現已淘汰
    - RC4 → 適用於網路通訊，但已不安全
- 備註：AES
    - feature
        - 對稱式加密 → 加密和解密都使用相同的密鑰。
        - 區塊加密 → 以 128 位元區塊 為單位進行加密。
        - 多種密鑰長度 → 支援 128、192、256 位元密鑰，密鑰越長，安全性越高。
        - 高效能 → 計算速度快，適合大規模數據加密。
        - 抗攻擊能力強 → 目前仍未被破解，適用於金融、政府、企業安全需求。
    - working flow
        - AddRoundKey → 初始密鑰混合
        - SubBytes → 透過 S-box 進行非線性替換
        - ShiftRows → 重新排列數據
        - MixColumns → 增加擴散性
        - 重複多輪加密 → 依密鑰長度決定迴圈次數（128 位元密鑰執行 10 輪，256 位元密鑰執行 14 輪）
    - [參考](https://zh.wikipedia.org/zh-tw/%E9%AB%98%E7%BA%A7%E5%8A%A0%E5%AF%86%E6%A0%87%E5%87%86)
- 備註：DES
    - feature
        -  對稱式加密 → 加密與解密都使用相同的密鑰。
        - 區塊加密 → 以 64 位元區塊 為單位進行加密。
        - 密鑰長度 56 位元 → 但由於密鑰過短，容易被暴力破解。
        - 16 輪加密 → 使用 費斯妥網路（Feistel Network） 進行多輪加密，提高安全性。
    - working flow 
        - 初始置換（IP） → 重新排列輸入數據。
        - 16 輪加密 → 每輪使用不同的子密鑰進行替換與置換。
        - 最終置換（FP） → 產生密文
    - problem
        -  密鑰長度過短 → 56 位元密鑰容易被暴力破解。
        - 已被破解 → 1999 年，電子前哨基金會（EFF）成功在 22 小時內破解 DES。
        - 已被 AES 取代 → 2001 年，美國政府正式採用 AES（Advanced Encryption Standard） 取代 DES。
    - [參考](https://zh.wikipedia.org/zh-tw/%E8%B3%87%E6%96%99%E5%8A%A0%E5%AF%86%E6%A8%99%E6%BA%96)
- 備註：RC4
    - feature
        - 串流加密 → 逐位元加密數據，而非區塊加密（如 AES）。
        - 運算速度快 → 適合即時通訊與網路加密。
        - 密鑰長度可變 → 通常介於 40 到 2048 位元。
        - 簡單易實作 → 只需基本的數學運算（異或 XOR）\
    - [參考](https://zh.wikipedia.org/zh-tw/RC4)
- 備註：區塊加密
    - 是一種對稱加密演算法，它將明文分成固定大小的區塊，並對每個區塊進行加密。這與**串流加密（Stream Cipher）**不同，後者是逐位元加密數據
    - feature : 
        - 固定區塊大小：常見的區塊大小為 64 位元（如 DES）或 128 位元（如 AES）。
        - 加密模式：區塊加密通常與不同的加密模式結合使用，如：
            - ECB（電子密碼本）：每個區塊獨立加密，容易受到模式分析攻擊。
            - CBC（密碼區塊鏈結）：每個區塊與前一個密文區塊進行 XOR 運算，提高安全性。
            - CFB（密碼回饋）：類似串流加密，適用於即時加密。
            - OFB（輸出回饋）：避免錯誤傳播，適用於某些應用場景。
            - CTR（計數器模式）：使用計數器生成密鑰流，適合並行處理。
## Caesar cipher
- feature : 是一種替換加密技術，也是最古老的加密方法之一。它的原理很簡單：將每個字母在字母表中向前或向後移動固定數量的位置，從而產生密文。例如，如果偏移量是3，那麼：
    - A → D
    - B → E
    - C → F
- vulnerability : 暴力法可以破解，畢竟只要試 25 次即可
## Asymmetric cipher
- general : 又稱公開金鑰加密（Public-key Cryptography），是一種加密技術，它使用兩組不同的金鑰來進行加密和解密：
    - 公鑰（Public Key）：可公開，用於加密訊息。
    - 私鑰（Private Key）：必須保密，用於解密訊息
- feature : 
    - 安全性高：即使公鑰被公開，沒有私鑰就無法解密訊息。
    - 適用於身份驗證：可用於數位簽章，確保訊息的完整性和來源可信度。
    - 計算成本較高：比對稱加密慢，因此通常用於金鑰交換，而非大規模數據加密。
- type : 
    - RSA：最常見的非對稱加密演算法，廣泛應用於網路安全（如 HTTPS）。
    - ECC（橢圓曲線加密）：比 RSA 更高效，適用於移動設備和區塊鏈技術。
    - Diffie-Hellman：主要用於安全金鑰交換
- key points : 
    - One-way Trapdoor Function）是一種特殊的單向函數（One-way Function），它在一個方向上容易計算，但在沒有特定資訊的情況下很難反向計算。然而，當擁有陷門（Trapdoor）時，就能輕易地進行反向運算
- theorem : 
    -  The Euclidean algorithm（歐幾里得算法、輾轉相除法）
    - Modular arithmetic（模數運算）
    - Prime numbers（質數）
    - Fermat’s and Euler’s theorems
    - Fermat’s theorem（費馬小定理）
    - Euler’s totient function（歐拉函數）
    - Euler’s theorem（歐拉小定理）
    - 備註：這些離散都有交，就不詳細講解了...
- 備註：RSA
    - idea : 
        - 金鑰生成：
            - 選擇兩個大質數 ( p ) 和 ( q )，計算 ( n = p \times q )。
            - 計算歐拉函數 ( \varphi(n) = (p-1)(q-1) )。
            - 選擇一個與 ( \varphi(n) ) 互質的數 ( e )（通常為 65537）。
            - 計算私鑰 ( d )，使得 ( e \times d \equiv 1 \mod \varphi(n) )。
        - 加密：
            - 將明文轉換為數字 ( m )。
            - 使用公鑰 ( (e, n) ) 計算密文 ( c = m^e \mod n )。
        - 解密：
            - 使用私鑰 ( (d, n) ) 計算明文 ( m = c^d \mod n )。
    - application
        - HTTPS
        - digital signature
        - key exchange
    - [參考](https://zh.wikipedia.org/zh-tw/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95)
- 備註：ECC
    - general : 是一種非對稱加密技術，它基於橢圓曲線上的數學運算來提供高效的加密和解密。ECC 相較於 RSA，能在更短的金鑰長度下提供相同甚至更高的安全性
    - idea : 
        - 選擇橢圓曲線：使用特定的數學公式，如： [ y3 + ax + b ] 其中 ( a ) 和 ( b ) 是曲線參數。
        - 選擇基點 ( G )：這是曲線上的一個固定點。
        - 生成公私鑰：
            - 私鑰 ( d )：隨機選擇一個大數。
            - 公鑰 ( Q )：計算 ( Q = dG )，這是私鑰與基點的乘積
    - advantage : 
        - 更短的金鑰長度：ECC 256 位元的安全性相當於 RSA 3072 位元。
        - 計算效率高：適合低功耗設備，如手機和 IoT 裝置。
        - 更快的加密與解密：比 RSA 更快，適合高效能應用
    - [參考](https://zh.wikipedia.org/zh-tw/%E6%A4%AD%E5%9C%86%E6%9B%B2%E7%BA%BF%E5%AF%86%E7%A0%81%E5%AD%A6)
## Digital signature
- hash : 是一種數學運算，將任意長度的輸入轉換為固定長度的輸出，稱為雜湊值（Hash Value）
    - 備註：hash 在 DS 中有詳細介紹，這裡不再贅述
- general : 是一種加密技術，用來驗證電子文件的真實性和完整性。它確保文件的來源可信，並防止內容被篡改
- flow : 
    - 雜湊（Hash）：對文件內容進行雜湊運算，產生固定長度的雜湊值。
    - 加密簽章：
        - 使用私鑰（Private Key）對雜湊值進行加密，形成數位簽章。
        - 這確保只有擁有私鑰的人能夠簽署文件。
    - 驗證簽章：
        - 接收方使用公鑰（Public Key）解密簽章，並計算文件的雜湊值。
        - 如果解密後的雜湊值與計算出的雜湊值相同，則文件未被篡改，且確實來自簽署者。
- feature : 
    - 身份驗證：確保簽署者的身份真實。
    - 完整性保護：防止文件內容被修改。
    - 不可否認性：簽署者無法否認曾簽署文件。
## Public-key infrastructure (PKI)
- general : 是一套用於管理公開金鑰加密的技術和標準，確保網路通訊的安全性。
- component : 
    - 憑證授權機構（CA，Certificate Authority）
        - 負責簽發和管理數位憑證，確保公鑰的真實性。
    - 註冊機構（RA，Registration Authority）
        - 驗證使用者身份，確保憑證申請者的合法性。
    - 憑證庫（Certificate Repository）
        - 存儲和分發憑證，供使用者查詢。
    - 憑證撤銷列表（CRL，Certificate Revocation List）
        - 列出已失效或被撤銷的憑證，防止非法使用
- working flow : 
    - 使用者申請憑證：向 CA 提交身份驗證請求。
    - CA 簽發憑證：驗證身份後，CA 生成憑證並簽署。
    - 憑證分發：憑證存入憑證庫，供其他人驗證。
    - 加密與驗證：
        - 使用公鑰加密訊息，只有擁有私鑰的人能解密。
        - 使用數位簽章驗證訊息的完整性和來源。














# Fundamentals of Distributed and Decentralized Systems
## Distributed systems
- 由多個獨立計算節點組成 的系統，它們相互協作來執行任務，而非依賴單一中央伺服器。這種架構廣泛應用於 雲端運算、區塊鏈、分散式資料庫、網路服務 等領域。
- concurrency : 
    - 同時執行多個程序 → 允許多個任務在不同節點上並行運行，提高效率。
    - 資源共享 → 這些程序可能要存取共享的資源，例如 分散式文件系統 或 資料庫。
    - 挑戰：同步與競爭條件 → 需要專門機制（如鎖、時間戳記）來防止 數據衝突。
- no global clock : 
    - 不同節點無法精確同步時間 → 無法依賴單一時間軸來排序事件。
    - 解決方案：邏輯時鐘（Logical Clocks） → 使用演算法（如 Lamport 時鐘、Vector Clocks）來建立時間順序，而非物理時鐘。
    - 挑戰：事件排序 → 分散式系統需要一致性機制來確保正確處理 數據同步與更新
- message passing : 
    - 節點之間無法共享記憶體，只能透過網路傳送訊息來協調。
    -  需要可靠的通訊協議 → 使用 TCP/IP、gRPC、Kafka 等方式確保消息傳遞的正確性。
    - 挑戰：網路延遲與故障 → 可能出現訊息遺失、亂序等問題，需要 重試機制 或 一致性演算法。
- independent failures and fault tolerance
    -  每個節點都可能獨立發生故障 → 但系統仍應能繼續運行。
    - 使用冗餘設計 → 透過 副本（Replication） 和 共識演算法（如 Raft、Paxos） 來提高可靠性。
    - 挑戰：如何確保高可用性？ → 需要適當的錯誤恢復機制，如 分區容忍（Partition Tolerance）。
- distributed vs. decentralized
    - 分散式系統 → 多個節點協作，但可能仍然有中央控制單位（如 Google Cloud）。
    - 去中心化系統（Decentralized Systems） → 沒有中央機構控制，每個節點都完全自主運作，如 區塊鏈、P2P 網路。
    - 挑戰：去中心化如何達成共識？ → 使用 共識機制（如 PoW、PoS、PBFT）來確保安全性與一致性。
## Inter-process communication : socket & ports
- socket
    - socket是網路通訊的核心機制，允許不同的應用程式透過網路交換資訊。
    - socket類似「電話插座」 → 兩個應用程式透過網路進行交流，像是打電話一樣。
    - 主要分類：
        - TCP socket（面向連接） → 提供可靠的數據傳輸，如 HTTP、FTP。
        - UDP socket（無連接） → 提供高速但不可靠的數據傳輸，如 直播、VoIP。
    ~~~c
        int sockfd = socket(AF_INET, SOCK_STREAM, 0);
        /*使用IPv4並用TCP連接*/
    ~~~
- ports
    - 端口是電腦上的「通信通道」，每個網路服務都有對應的端口號。
    - 端口類似「門牌號」 → 讓資料正確送到對應的應用程式。
    - 常見端口號：  

        | 端口 | 用途 |
        |------|------| 
        | 80 | HTTP（網頁瀏覽） | 
        | 443 | HTTPS（加密網頁） | 
        | 22 | SSH（遠端登入） | 
        | 3306 | MySQL（資料庫） |
    ~~~c
        server_address.sin_port = htons(8080);
        /* 監聽8080端口，並把端口轉換為網路格式*/
    ~~~
## Remote procedure call
- core
    - 是一種網路通訊技術，它允許一台電腦上的程式調用另一台電腦上的函式，就像調用本地函式一樣。這在 分散式系統 和 微服務架構 中非常重要。
    - 像本地函式一樣呼叫遠端服務 → 程式不需要知道遠端服務的內部實現，只要知道「函式名稱」和「輸入輸出」即可。
    - 封裝網路通訊 → RPC 自動處理請求與回應，開發者不需要手動寫 Socket 或 HTTP 代碼。
    - 高效能與低延遲 → 適合需要快速通訊的系統，如 分散式應用、資料庫查詢、微服務間互動。
    ~~~c
        result = add_number(5,3);//本地函式
        result = remote_call("add_numbers",5,3);//透過網路呼叫遠端函式
    ~~~
- flow
    - 客戶端發送請求 → 呼叫函式並將參數打包成消息。
    - 伺服器接收請求 → 解析數據並執行函式。
    - 伺服器回傳結果 → 返回計算結果給客戶端。
    - 客戶端獲取結果 → 像本地函式一樣使用回應數據
- application
    -  微服務架構 → 服務之間透過 RPC 互相溝通，提高開發效率。
    - 分散式資料庫 → 例如 Google Spanner 使用 RPC 來同步數據。
    - 遠端伺服器 API → 例如區塊鏈節點（Ethereum）透過 RPC 來獲取交易資訊。
## Marshalling vs. unmarshalling
- marshalling
    - 將數據轉換為可傳輸的格式，例如 JSON、XML 或二進制數據。
    - 適用於跨系統通訊 → 讓數據能在不同語言或不同系統間傳輸。
    - 通常與 RPC 或網路通訊一起使用 → 把函式參數變成一個可發送的數據包
    ~~~python
        import json
        data = {"name": "Alice", "age":25}
        encode_data = json.dump(data) #JSON 編碼
    ~~~
- unmarshalling
    - 將接收到的編碼數據轉換回原始格式，讓應用程式可以使用。
    - 適用於解析來自網路的數據 → 例如，解析 API 返回的 JSON 數據。
    - 確保不同系統能夠理解數據 → 例如 Java 解析 Python 發送的 JSON。
    ~~~python
        decoded_data = json.loads(encoded_data) #JSON 解碼
        print(decoded_data["name"]) #輸出名字 alice
    ~~~
## Consensus problem
- general : 分散式系統中的一個核心挑戰，指的是如何讓多個獨立的節點在沒有中央控制的情況下達成一致決策。這在 區塊鏈、分散式資料庫、分散式計算 等領域非常重要。
- importance : 
    - 確保系統一致性 → 在分散式系統中，每個節點可能有不同的數據或狀態，必須透過共識機制來確保所有節點達成一致。
    - 防止惡意行為 → 在開放網路環境中，可能有惡意節點試圖操控系統，共識機制能夠抵禦攻擊。
    - 提高可靠性 → 即使某些節點故障，系統仍然能夠正常運作，確保高可用性。
- common algorithm
    -  Paxos → 用於分散式資料庫，確保多個節點在網路延遲或故障時仍能達成一致。
    - Raft → 比 Paxos 更易於理解與實作，常用於分散式存儲系統。
    - PoW（工作量證明） → 比特幣使用的共識機制，透過計算競爭來確保交易安全。
    - PoS（權益證明） → 以太坊 2.0 採用的機制，透過持有代幣來決定誰能驗證交易  
- 備註：拜占庭將軍問題
    - 問題：像一群 拜占庭將軍 圍攻一座城市，他們必須 共同決定是否進攻或撤退，但：
        - 將軍們只能透過信使溝通，而信使可能會被攔截或傳遞錯誤資訊。
        - 某些將軍可能是叛徒，故意傳遞錯誤指令來破壞決策一致性。
        - 所有忠誠的將軍必須達成共識，否則行動可能失敗。
    - 解方：
        - 拜占庭容錯（Byzantine Fault Tolerance, BFT） → 只要 惡意節點少於總數的 1/3，系統仍能達成共識。
        - 數位簽章 → 確保訊息的真實性，防止惡意節點偽造資訊。
        - 共識演算法 → 例如 PBFT（Practical Byzantine Fault Tolerance），透過多輪投票來確保決策一致性。
        - 區塊鏈技術 → 例如 比特幣的 PoW（工作量證明），確保惡意節點無法輕易操控交易記錄。
- [參考](https://cryptowesearch.com/articles/BFT-Byzantine-Fault-Tolerance)






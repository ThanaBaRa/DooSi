// ============================================================================
// DooSi.BaRa (ดูสิ.บาร่า) — สำนักไพ่ทาโรต์สายมีม 2026
// ============================================================================

const DEFAULT_TAROT_CARDS = [
    {
        id: "ikatoey",
        tone: "neutral",
        roman: "0 • THE SASSY ORACLE",
        phrase: "อิกะเทย",
        engTitle: "The Supreme Sass",
        powerTag: "ออร่าความจึ้ง 100 เดซิเบล",
        svgIcon: "lips-crown",
        funnyMeaning: "เสียงในหัวที่ดังขึ้นมาอัตโนมัติเวลาเห็นเพื่อนทำตัวแปลกๆ หรือมั่นหน้าเกินเบอร์ เป็นพลังงานแห่งความจริงใจระดับล้านเปอร์เซ็นต์ ด่าแปลว่ารัก ทักแปลว่ามีเรื่องเม้าท์ด่วน!",
        realisticProphecy: "ช่วงนี้เซนส์เรื่องคนของคุณแม่นเหมือนตาเห็น ใครมาดีหรือมาเหลี่ยมคุณมองออกตั้งแต่ร้อยเมตรแรก การงานจะมีเพื่อนสายฝีปากกล้าเข้ามาช่วยแก้ปัญหา แต่ต้องระวังปากพาจน เผลอเม้าท์ใครให้ดูหลังก่อนว่าเจ้าตัวยืนอยู่ข้างหลังหรือเปล่า!",
        blessing: "ขอให้ชีวิตจึ้งเกินต้าน มีกินมีใช้ไม่ขาดมือ และมีเรื่องเม้าท์แซ่บๆ ให้ตื่นเต้นทุกสัปดาห์!",
        luckyColor: "ชมพูบานเย็นกระแทกตา",
        luckyItem: "ลิปกลอสฉ่ำวาว & ยาดมกระปุกเขียว",
        luckyNumber: "09, 88"
    },
    {
        id: "wods",
        tone: "negative",
        roman: "I • THE COSMIC WHAT?!",
        phrase: "วอดส์",
        engTitle: "The Sassy 'What?!'",
        powerTag: "วอดส์ อะไรวะเนี่ย เสียเงินอีกละ!",
        svgIcon: "question-eye",
        funnyMeaning: "มาจากคำว่า 'What?!' ที่แปลว่าอะไรนะ! มักจะหลุดปากออกมาอัตโนมัติตอนเช็กสลิปโอนเงินแล้วอุทานว่า 'วอดส์ อะไรวะเนี่ย เสียเงินอีกละ!' ตั้งใจออกบ้านไปซื้อข้าวกล่องเดียว แต่เดินกลับห้องมาพร้อมถุงช้อปปิ้ง 4 ใบแบบงงๆ",
        realisticProphecy: "ดวงการเงินรั่วไหลระดับเขื่อนแตก! ช่วงนี้แค่ก้าวขาออกจากบ้านหรือเปิดแอปช้อปปิ้งก็เสียตังค์แล้ว มีเกณฑ์โดนป้ายยาของที่ไม่ได้จำเป็น โดนเพื่อนชวนหารของแพง หรือจ่ายค่าปรับค่าธรรมเนียมแบบอิหยังวะ จนต้องร้อง 'วอดส์ เสียเงินอีกละ!' วันละสามเวลาหลังอาหาร",
        blessing: "ขอให้ตั้งสติก่อนสแกน QR และขอให้เงินที่เสียไปงอกกลับมาใหม่ไวๆ!",
        luckyColor: "ม่วงพาสเทลคนงง",
        luckyItem: "สลิปโอนเงินใบล่าสุด & กาแฟเย็น",
        luckyNumber: "14, 77"
    },
    {
        id: "ikae",
        tone: "negative",
        roman: "II • THE ANCIENT ONE",
        phrase: "อิแก่",
        engTitle: "The Eternal Backpain",
        powerTag: "ปวดหลังแต่ยังฝืน",
        svgIcon: "hourglass-staff",
        funnyMeaning: "ไม่ได้แปลว่าอายุเยอะเสมอไป แต่แปลว่าเริ่มบ่นปวดหลังตั้งแต่บ่ายสอง ง่วงนอนตอนสามทุ่ม ลุกก็โอยนั่งก็โอย และเป็นคำเรียกเพื่อนสนิทด้วยความเอ็นดูปนหมั่นไส้ขั้นสูงสุด",
        realisticProphecy: "สังขารเริ่มประท้วงอย่างเป็นทางการ! ช่วงนี้ระวังนอนตกหมอน ก้มเก็บของแล้วหลังยอก หรือเดินขึ้นบันไดแค่สองชั้นก็หอบแฮ่กเหมือนวิ่งมาราธอน แถมเงินที่หามาได้มีเกณฑ์ต้องเอาไปถวายค่ายาดม ยาหม่อง แผ่นแปะแก้ปวด และหมอนวดแผนไทย",
        blessing: "ขอให้กระดูกสันหลังแข็งแรง คอลลาเจนไม่เสื่อม และเพื่อนเลิกทักว่าแก่สักที!",
        luckyColor: "ทองโบราณเลอค่า",
        luckyItem: "ยาดมสมุนไพร & หมอนรองคอ",
        luckyNumber: "29, 92"
    },
    {
        id: "pokphiw100",
        tone: "positive",
        roman: "III • THE RADIANT SHIELD",
        phrase: "พอกผิว 100%",
        engTitle: "The 100% Skin Glaze",
        powerTag: "ออร่าฉ่ำโกลว์ทะลุจักรวาล",
        svgIcon: "sparkle-lotus",
        funnyMeaning: "สภาวะการรักตัวเองขั้นสุด ทาครีมหนาเหมือนฉาบปูน สปอยล์ตัวเองไม่สนโลก ใครจะดราม่าอะไรช่างเขา เพราะวันนี้ผิวฉันต้องฉ่ำโกลว์และดูแพงไว้ก่อน!",
        realisticProphecy: "เป็นจังหวะที่เสน่ห์และออร่าความดูดีของคุณพุ่งแรงมาก การหันมาดูแลตัวเองและแต่งตัวดีๆ จะดึงดูดทั้งโอกาสเรื่องงานและคนเข้ามาขายขนมจีบ การเงินมีเกณฑ์ได้ของสวยๆ งามๆ หรือมีคนใจดีเข้ามาเปย์ให้หน้าฉ่ำกว่าเดิม",
        blessing: "ขอให้ผิวฉ่ำเหมือนเคลือบแก้ว หน้าเด็กลง 10 ปี และเงินเข้าบัญชีฉ่ำเหมือนทาโลชั่น 3 ชั้น!",
        luckyColor: "ขาวมุกโกลว์ / ทองแชมเปญ",
        luckyItem: "กันแดดหลอดโปรด & น้ำแร่ฉีดหน้า",
        luckyNumber: "10, 100"
    },
    {
        id: "cheeserve",
        tone: "positive",
        roman: "IV • THE EMPRESS OF SERVING",
        phrase: "ชีเสิร์ฟ",
        engTitle: "The Unstoppable Server",
        powerTag: "เสิร์ฟความปังระดับมิชลิน",
        svgIcon: "chalice-star",
        funnyMeaning: "ไม่ว่าสถานการณ์ตรงหน้าจะวุ่นวายแค่ไหน แต่หน้าผมและอินเนอร์ต้องเป๊ะไว้ก่อน พร้อมเสิร์ฟความมั่นใจและผลงานระดับตัวแม่แม้จะปั่นงานเสร็จก่อนส่งแค่ 5 นาที",
        realisticProphecy: "ความมั่นใจและลูกบ้าจะพาคุณรอดพ้นทุกอุปสรรคในสัปดาห์นี้ หากกำลังคิดจะเสนอไอเดีย สมัครงานใหม่ หรือทักหาใคร ให้ลุยเลยอย่าลังเล จักรวาลกำลังเปิดไฟเขียวให้คนกล้าแสดงออก",
        blessing: "ขอให้เสิร์ฟอะไรก็ปัง คนเห็นเป็นต้องชม ได้รับทิปจากจักรวาลเป็นแบงก์เทาปึกใหญ่!",
        luckyColor: "แดงไวน์ตัวแม่",
        luckyItem: "แว่นกันแดดทรงเฉี่ยว",
        luckyNumber: "04, 45"
    },
    {
        id: "juengเกิน",
        tone: "positive",
        roman: "V • THE WHEEL OF JUENG",
        phrase: "จึ้งเกินคุณน้า",
        engTitle: "The Wheel of Jueng",
        powerTag: "ดวงพุ่งทะลุเพดาน",
        svgIcon: "wheel-sun",
        funnyMeaning: "สิ่งที่คิดว่าจะพังดันปังเฉย สิ่งที่ไม่ได้คาดหวังกลับออกมาดีเกินต้าน จนต้องยกมือทาบอกแล้วอุทานว่า 'คุณน้า มันจึ้งเกิน!'",
        realisticProphecy: "กงล้อโชคชะตากำลังหมุนเข้าสู่ขาขึ้นอย่างชัดเจน มีเกณฑ์ได้รับข่าวดีที่รอคอย ทั้งเรื่องโปรเจกต์ การสอบ หรือเงินพิเศษที่ลืมไปแล้ว ลองเปิดใจรับคำชวนจากเพื่อนใหม่ๆ เพราะจะนำพาโชคดีมาให้",
        blessing: "ขอให้ความโชคดีพุ่งชนแบบไม่ทันตั้งตัว จึ้งทั้งเงิน จึ้งทั้งงาน จึ้งทั้งความรัก!",
        luckyColor: "ส้มพีชประกายทอง",
        luckyItem: "เครื่องประดับสีทองชิ้นเล็ก",
        luckyNumber: "56, 65"
    },
    {
        id: "tuenkasao",
        tone: "neutral",
        roman: "VI • THE REALITY BELL",
        phrase: "ตื่นค่ะสาว",
        engTitle: "The Great Awakening",
        powerTag: "ระฆังเรียกสติ 500 โวลต์",
        svgIcon: "sun-bell",
        funnyMeaning: "เสียงเตือนสติด้วยความหวังดีจากเพื่อนรัก เมื่อเห็นคุณกำลังจะกลับไปทำเรื่องเดิมๆ เช่น ทักหาคนคุยเก่าที่หายไปสามเดือน หรือเชื่อคำพูดเพื่อนที่บอกว่า 'ออกให้ก่อนเดี๋ยวโอนคืน'",
        realisticProphecy: "คุณกำลังจะตาสว่างและเห็นความจริงบางอย่างที่ทำให้ตัดสินใจได้เด็ดขาดขึ้น หากยังมัวหลอกตัวเองอยู่ระวังจะเสียเวลาฟรี แต่ถ้ากล้าตัดสิ่งที่ไม่ใช่ออกไปตอนนี้ ชีวิตจะโล่งขึ้นทันที",
        blessing: "ขอให้ตื่นมาพร้อมสติปัญญาอันเฉียบแหลม ใครก็หลอกไม่ได้ และตื่นมาเจอแจ้งเตือนเงินเข้าทุกเช้า!",
        luckyColor: "ฟ้าสดใสตาสว่าง",
        luckyItem: "นาฬิกาข้อมือ หรือ มัทฉะลาเต้",
        luckyNumber: "06, 61"
    },
    {
        id: "konkuy",
        tone: "negative",
        roman: "VII • THE SITUATIONSHIP",
        phrase: "คนคุยหรือคนคุก",
        engTitle: "The Mystic Situationship",
        powerTag: "ความสัมพันธ์สายชาร์จปลอม",
        svgIcon: "twin-moons",
        funnyMeaning: "เดี๋ยวดีเดี๋ยวหาย ชาร์จเข้าบ้างไม่เข้าบ้าง ตอบแชททีนึกว่าส่งนกพิราบสื่อสารมาจากต่างแดน แต่พอเขาส่งสติกเกอร์มาตัวเดียว ใจดันเหลวเป็นขี้ผึ้งลนไฟ",
        realisticProphecy: "ดวงความรักและการรอคอยช่วงนี้แห้งแล้งเหมือนทะเลทราย! คนที่รอให้เขาทักมาจะยังเงียบกริบ หรือตอบสั้นระดับส่งรหัสมอร์ส ส่วนคนมีคู่ระวังงอนกันเรื่องไร้สาระ เช่น ถามว่ากินอะไรดีแล้วตอบว่า 'อะไรก็ได้' จนสุดท้ายไม่ได้กินสักร้าน",
        blessing: "ขอให้หลุดพ้นจากคนคุยใจร้าย ได้เจอคนจริงใจที่ตอบแชทไวภายใน 3 วินาที!",
        luckyColor: "ม่วงลาเวนเดอร์",
        luckyItem: "พาวเวอร์แบงก์เต็ม 100%",
        luckyNumber: "27, 72"
    },
    {
        id: "onwai",
        tone: "neutral",
        roman: "VIII • THE FAST TRANSFER",
        phrase: "โอนไวใจนิ่ง",
        engTitle: "The Speed of QR",
        powerTag: "สแกนจ่ายไวกว่าแสง",
        svgIcon: "lightning-coin",
        funnyMeaning: "นิ้วล็อกเป็นเรื่องตลก แต่นิ้วกด CF ของลดราคาไวระดับนักกีฬาอีสปอร์ต ตอนกดโอนใจนิ่งดั่งนักปราชญ์ ตอนดูสรุปยอดปลายเดือนใจเต้นเป็นจังหวะสามช่า",
        realisticProphecy: "การเงินช่วงนี้เป็นกราฟรถไฟเหาะ เข้าปุ๊บออกปั๊บไม่ทันได้อุ่นในบัญชี จะได้ของชิ้นที่อยากได้มานานสมใจ แต่ต้องแลกกับการบริหารเงินแบบเดือนชนเดือน ห้ามให้ใครยืมเงินเด็ดขาดเพราะมีเกณฑ์ได้คืนชาติหน้า",
        blessing: "ขอให้เงินไหลเข้าบัญชีไวกว่าสปีดการสแกน QR จ่ายตังค์ของคุณร้อยเท่า!",
        luckyColor: "เขียวเหนี่ยวทรัพย์",
        luckyItem: "กระเป๋าสตางค์จัดระเบียบธนบัตร",
        luckyNumber: "82, 28"
    },
    {
        id: "nguang",
        tone: "neutral",
        roman: "IX • THE SLEEPY HERMIT",
        phrase: "ง่วงเป็นอาชีพ",
        engTitle: "The Eternal Napper",
        powerTag: "แบตเตอรี่ชีวิตเหลือ 3%",
        svgIcon: "crescent-cloud",
        funnyMeaning: "ตื่นนอนคือการเริ่มต้นนับถอยหลังเพื่อกลับไปนอนใหม่ นั่งทำงานได้ 15 นาทีวิญญาณเตรียมกลับบ้าน ความฝันสูงสุดไม่ใช่การครองโลก แต่คือการนอนตื่นสายโดยไม่มีใครโทรตาม",
        realisticProphecy: "พลังงานชีวิตอยู่ในโหมดประหยัดแบตเตอรี่ขั้นสุด สมองตื้อคิดอะไรไม่ค่อยออกเพราะนอนดึกไถฟีดเพลิน ช่วงนี้อย่าเพิ่งรับปากทำเรื่องยากๆ ให้เน้นประคองตัวแล้วรีบกลับไปนอนชาร์จแบตก่อนร่างจะพัง",
        blessing: "ขอให้คืนนี้หลับสนิท 8 ชั่วโมงรวด ไม่ฝันเรื่องงาน ตื่นมาสดชื่นเหมือนได้เกิดใหม่ในร่างเศรษฐี!",
        luckyColor: "น้ำเงินกรมท่า",
        luckyItem: "ผ้าห่มนุ่มๆ & เทียนหอมกลิ่นผ่อนคลาย",
        luckyNumber: "09, 90"
    },
    {
        id: "tuamae",
        tone: "positive",
        roman: "X • THE UNBOTHERED QUEEN",
        phrase: "ตัวแม่จะแคร์เพื่อ",
        engTitle: "The Sovereign Queen",
        powerTag: "ภูมิคุ้มกันดราม่าเต็มแม็กซ์",
        svgIcon: "crown-star",
        funnyMeaning: "ใครจะเม้าท์อะไรก็เชิญตามสบาย เพราะคิวคนจะรวยและมีความสุขมันยุ่งมาก ไม่มีเวลาไปนั่งแคร์คำพูดของคนที่ไม่ได้โอนเงินเข้าบัญชีให้เราใช้",
        realisticProphecy: "การวางตัวนิ่งๆ ยิ้มมุมปาก และโฟกัสแต่เป้าหมายของตัวเองจะทำให้คุณดูน่าเกรงขามและมีเสน่ห์มากในสัปดาห์นี้ เรื่องกวนใจจากคนรอบข้างจะทำอะไรคุณไม่ได้เลย แถมผลงานของคุณจะโดดเด่นจนทุกคนต้องยอมรับ",
        blessing: "ขอให้มีเกราะป้องกันคนประสาทแดก 100% ชีวิตมีแต่ความสงบสุข ร่ำรวย และสวยขึ้นทุกวัน!",
        luckyColor: "ดำตัดทองลักชูรี่",
        luckyItem: "น้ำหอมกลิ่นโปรดที่ฉีดแล้วมั่นใจ",
        luckyNumber: "10, 19"
    },
    {
        id: "somnamna",
        tone: "positive",
        roman: "XI • THE SWEET KARMA",
        phrase: "สมน้ำหน้า (ด้วยความเคารพ)",
        engTitle: "The Poetic Justice",
        powerTag: "กฎแห่งกรรมติดเทอร์โบ",
        svgIcon: "scales-flame",
        funnyMeaning: "ไพ่แห่งความยุติธรรมและรอยยิ้มมุมปากเล็กๆ เมื่อเห็นคนที่เคยเอาเปรียบเราแพ้ภัยตัวเอง หรือเพื่อนรักที่เตือนแล้วไม่ฟังสุดท้ายเดินกลับมาบอกว่า 'กูว่าแล้ว'",
        realisticProphecy: "ความดีและความอดทนที่คุณสะสมมากำลังจะส่งผลตอบแทนอย่างงดงาม เรื่องที่เคยถูกเข้าใจผิดจะได้รับการเคลียร์ให้กระจ่าง ส่วนใครที่คิดไม่ซื่อกับคุณจะหลุดออกจากวงโคจรไปเองแบบที่คุณไม่ต้องเหนื่อยลงมือ",
        blessing: "ขอให้คนคิดร้ายแพ้ภัยตัวเองไปไกลๆ ส่วนตัวคุณขอให้นั่งสวยๆ รวยๆ รับทรัพย์และคำชม!",
        luckyColor: "เขียวมรกต",
        luckyItem: "ชานมไข่มุกหวาน 50% ไว้จิบดูดราม่า",
        luckyNumber: "11, 55"
    },
    {
        id: "tidglam",
        tone: "negative",
        roman: "XII • THE GLAM NOODLE",
        phrase: "ติดแกลมแต่กินมาม่า",
        engTitle: "The Luxury Survivalist",
        powerTag: "คาเฟ่หลักพัน เงินในบัญชีหลักสิบ",
        svgIcon: "chalice-star",
        funnyMeaning: "ภาพลักษณ์ในไอจีเหมือนลูกคุณหนูดูไบ จิบกาแฟแก้วละสองร้อยห้าสิบ แต่พอกลับถึงห้องต้มบะหมี่กึ่งสำเร็จรูปใส่ไข่หนึ่งฟองถ้วนเพื่อประทังชีวิตถึงสิ้นเดือน",
        realisticProphecy: "เตือนภัยความถังแตกแบบลักชูรี่! ช่วงนี้รายจ่ายเพื่อรักษาภาพลักษณ์บานปลายหนักมาก ต้นเดือนกินบุฟเฟต์เหมือนเป็นเจ้าของร้าน ปลายเดือนต้องนั่งนับเหรียญในกระปุกออมสินมาซื้อข้าวไข่เจียว งดเข้าคาเฟ่เกินวันละแก้วด่วน!",
        blessing: "ขอให้รอดพ้นวิกฤตสิ้นเดือนนี้ไปได้โดยไม่ต้องต้มมาม่าหักครึ่งซอง!",
        luckyColor: "โรสโกลด์ไฮโซ",
        luckyItem: "คูปองส่วนลด & บัตรสะสมแต้มร้านกาแฟ",
        luckyNumber: "12, 42"
    },
    {
        id: "sucheewit",
        tone: "negative",
        roman: "XIII • THE KUNGFU LIFE",
        phrase: "สู้ชีวิตแต่ชีวิตสู้กลับ",
        engTitle: "The Heavyweight Fighter",
        powerTag: "อึดถึกทนระดับแมลงสาบเรียกพี่",
        svgIcon: "lightning-coin",
        funnyMeaning: "ตั้งใจจะเริ่มต้นวันใหม่แบบสดใส แต่ก้าวขาออกจากบ้านปุ๊บเจอฝนตก รถติด งานงอก จนอยากถามจักรวาลว่านี่บททดสอบหรือรายการแกล้งกันแน่",
        realisticProphecy: "สัปดาห์แห่งจังหวะนรก! วันไหนรีบรถจะติด วันไหนใส่รองเท้าคู่โปรดฝนจะตก วันไหนตั้งใจจะเลิกงานตรงเวลาจะมีงานด่วนเด้งเข้ามาตอน 16:55 น. ต้องทำใจร่มๆ และพกยาดมติดตัวไว้ตลอดเวลา",
        blessing: "ขอให้ชีวิตลดหมัดฮุกใส่คุณลงบ้าง และผ่านพ้นสัปดาห์สุดโหดนี้ไปได้แบบครบ 32 ประการ!",
        luckyColor: "ส้มอิฐพลังบวก",
        luckyItem: "เครื่องดื่มชูกำลัง หรือ ช็อกโกแลตเย็น",
        luckyNumber: "13, 39"
    },
    {
        id: "yahatham",
        tone: "neutral",
        roman: "XIV • THE FORBIDDEN MOVE",
        phrase: "อย่าหาทำ",
        engTitle: "The Cosmic Warning",
        powerTag: "เบรกเอี๊ยดก่อนลงเหว",
        svgIcon: "sun-bell",
        funnyMeaning: "เสียงกระซิบจากเทวดาประจำตัว (และเพื่อนสนิท) เวลาคุณเริ่มมีความคิดแปลกๆ ตอนตีสอง เช่น ตัดหน้าม้าเอง ทักหาแฟนเก่า หรือกดสั่งของตอนเมาขี้ตา",
        realisticProphecy: "หากช่วงนี้กำลังลังเลว่าจะทำเรื่องเสี่ยงๆ หรือตัดสินใจอะไรด้วยอารมณ์ชั่ววูบ ให้หยุดคิดสักคืนหนึ่งก่อน การยั้งมือไว้จะช่วยให้คุณรอดพ้นจากการเสียเงินฟรีหรือเสียเวลาไปกับเรื่องไม่เป็นเรื่อง",
        blessing: "ขอให้มีสติครบถ้วน แคล้วคลาดจากเรื่อง 'อย่าหาทำ' ทั้งปวง มีแต่เรื่องดีๆ เข้ามาแทน!",
        luckyColor: "เหลืองอำพันเตือนภัย",
        luckyItem: "โพสต์อิทแปะหน้าจอคอม",
        luckyNumber: "14, 40"
    },
    {
        id: "suaymaknok",
        tone: "positive",
        roman: "XV • THE JESTER'S CHARM",
        phrase: "สวยมักนก ตลกมักได้",
        engTitle: "The Charismatic Comedian",
        powerTag: "เสน่ห์สายฮาพาเพลิน",
        svgIcon: "lips-crown",
        funnyMeaning: "ตอนเก๊กหน้าสวยขรึมไม่มีใครกล้าจีบ แต่พอหลุดขำเสียงเหมือนเป็ดหรือปล่อยมุกแป้กเท่านั้นแหละ คนดันชอบและอยากเข้ามาทำความรู้จักเฉยเลย",
        realisticProphecy: "ความเป็นกันเองและอารมณ์ขันของคุณคืออาวุธลับที่ทรงพลังที่สุดในตอนนี้ ไม่ว่าจะไปคุยงานหรือคุยกับคนที่แอบชอบ ให้เป็นตัวเองแบบธรรมชาติเข้าไว้ แล้วทุกอย่างจะราบรื่นเกินคาด",
        blessing: "ขอให้ทั้งสวยทั้งตลก และได้ทั้งเงินก้อนโต ได้ทั้งความรักดีๆ แบบไม่ต้องนกอีกต่อไป!",
        luckyColor: "ชมพูพีชสดใส",
        luckyItem: "สติกเกอร์ไลน์กวนๆ",
        luckyNumber: "15, 59"
    },
    {
        id: "yoopen",
        tone: "neutral",
        roman: "XVI • THE SURVIVAL ARTIST",
        phrase: "อยู่เป็น",
        engTitle: "The Master of Blending In",
        powerTag: "ไหลลื่นดั่งปลาไหลทาเทฟลอน",
        svgIcon: "twin-moons",
        funnyMeaning: "ทักษะการเอาตัวรอดขั้นสูงในที่ทำงานและวงสนทนา พยักหน้าถูกจังหวะ ยิ้มรับทุกสถานการณ์แต่ไม่รับงานเพิ่ม รอดพ้นจากทุกดราม่าอย่างแนบเนียน",
        realisticProphecy: "ช่วงนี้ต้องใช้สกิลการ 'อยู่เป็น' ให้เต็มที่ ใครทะเลาะกันให้ทำตัวเป็นอากาศธาตุ อย่าเพิ่งออกตัวแรงแทนใคร แล้วคุณจะผ่านพ้นเรื่องวุ่นวายไปได้แบบตัวไม่เปื้อนฝุ่น",
        blessing: "ขอให้สกิลการเอาตัวรอดพุ่งปรี๊ด งานไม่โหลด เงินไม่ขาด และไม่มีใครหาเรื่องได้!",
        luckyColor: "เขียวมัทฉะเนียนกริบ",
        luckyItem: "หูฟังตัดเสียงรบกวน",
        luckyNumber: "16, 60"
    },
    {
        id: "saphap",
        tone: "negative",
        roman: "XVII • THE TOTAL WRECK",
        phrase: "สภาพพพ!",
        engTitle: "The Glorious Mess",
        powerTag: "วิญญาณหลุดออกจากร่าง",
        svgIcon: "crescent-cloud",
        funnyMeaning: "คำอุทานสั้นๆ ลากเสียง พ.พาน ยาวแปดเมตร เวลาส่องกระจกตอนเช้าหรือเพื่อนหันมาเห็นสารรูปเราหลังจากโหมงานหนักและนอนตีสี่ติดกันสามวัน",
        realisticProphecy: "ช่วงนี้ความเป๊ะเป็นศูนย์! มีเกณฑ์ตื่นสายหัวฟู รีบออกจากบ้านจนใส่เสื้อกลับตะเข็บ พูดจาลิ้นพันกัน หรือเผลอส่งแชทผิดกลุ่มให้ขายหน้าเล่น แนะนำให้เช็กความเรียบร้อยสองรอบก่อนก้าวขาออกจากห้องทุกครั้ง",
        blessing: "ขอให้กู้คืนสภาพร่างและสติกลับมาสวยหล่อเป๊ะปังได้ทันก่อนจะมีคนแคปหน้าจอทัน!",
        luckyColor: "เทาควันบุหรี่",
        luckyItem: "หวีพกพา & กาแฟดำเข้มๆ",
        luckyNumber: "17, 07"
    }
];

// ============================================================================
// State & Audio Engine
// ============================================================================
let state = {
    cards: [],
    shuffledDeck: [],
    spreadMode: 1, // 1 or 3
    selectedIndices: [],
    soundEnabled: true
};

class MysticSoundEngine {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
    }

    playTone(freq, type = "sine", duration = 0.25, delay = 0, gainVal = 0.08) {
        if (!state.soundEnabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime + delay;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(gainVal, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + duration);
        } catch (e) {
            // Ignore audio context restrictions
        }
    }

    playShuffle() {
        const notes = [330, 392, 440, 523.25, 659.25];
        notes.forEach((n, idx) => {
            this.playTone(n, "triangle", 0.14, idx * 0.055, 0.06);
        });
    }

    playFlip() {
        this.playTone(440, "sine", 0.2, 0, 0.08);
        this.playTone(554.37, "sine", 0.25, 0.08, 0.08);
        this.playTone(659.25, "triangle", 0.45, 0.16, 0.1);
        this.playTone(880, "sine", 0.6, 0.24, 0.07);
    }
}

const sound = new MysticSoundEngine();

// ============================================================================
// SVG Tarot Emblem Generator
// ============================================================================
function getTarotSvg(iconType) {
    const commonDefs = `
        <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fff4b8"/>
                <stop offset="50%" stop-color="#e5c158"/>
                <stop offset="100%" stop-color="#b58520"/>
            </linearGradient>
        </defs>
    `;

    const outerRing = `
        <circle cx="80" cy="80" r="70" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-dasharray="4 4"/>
        <circle cx="80" cy="80" r="62" fill="none" stroke="url(#goldGrad)" stroke-width="1.2" opacity="0.7"/>
        <polygon points="80,14 96,58 142,58 105,85 119,130 80,103 41,130 55,85 18,58 64,58" fill="none" stroke="url(#goldGrad)" stroke-width="1" opacity="0.3"/>
    `;

    let centerArt = "";
    switch (iconType) {
        case "lips-crown":
            centerArt = `
                <path d="M52,62 L62,42 L80,55 L98,42 L108,62 Z" fill="none" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <path d="M48,88 Q64,74 80,84 Q96,74 112,88 Q96,108 80,104 Q64,108 48,88 Z" fill="rgba(255,110,199,0.25)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <line x1="50" y1="88" x2="110" y2="88" stroke="url(#goldGrad)" stroke-width="1.5"/>
                <circle cx="80" cy="35" r="4" fill="#fdf0a6"/>
            `;
            break;
        case "question-eye":
            centerArt = `
                <path d="M34,80 Q80,45 126,80 Q80,115 34,80 Z" fill="rgba(184,107,255,0.2)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <circle cx="80" cy="80" r="16" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
                <text x="80" y="88" text-anchor="middle" fill="#fdf0a6" font-family="Cinzel Decorative, serif" font-size="24" font-weight="bold">?</text>
            `;
            break;
        case "hourglass-staff":
            centerArt = `
                <path d="M56,44 L104,44 L80,80 L104,116 L56,116 L80,80 Z" fill="rgba(229,193,88,0.18)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <line x1="50" y1="44" x2="110" y2="44" stroke="url(#goldGrad)" stroke-width="3"/>
                <line x1="50" y1="116" x2="110" y2="116" stroke="url(#goldGrad)" stroke-width="3"/>
                <circle cx="80" cy="60" r="5" fill="#fdf0a6"/>
            `;
            break;
        case "sparkle-lotus":
            centerArt = `
                <path d="M80,38 C95,60 95,90 80,112 C65,90 65,60 80,38 Z" fill="rgba(92,225,230,0.2)" stroke="url(#goldGrad)" stroke-width="2.2"/>
                <path d="M80,112 C105,98 118,75 112,54 C96,64 86,82 80,112 Z" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
                <path d="M80,112 C55,98 42,75 48,54 C64,64 74,82 80,112 Z" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
                <circle cx="80" cy="30" r="4" fill="#fdf0a6"/>
            `;
            break;
        case "chalice-star":
            centerArt = `
                <path d="M56,52 L104,52 C104,82 88,92 80,94 C72,92 56,82 56,52 Z" fill="rgba(255,110,199,0.2)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <line x1="80" y1="94" x2="80" y2="118" stroke="url(#goldGrad)" stroke-width="3"/>
                <line x1="62" y1="118" x2="98" y2="118" stroke="url(#goldGrad)" stroke-width="3"/>
                <polygon points="80,28 84,38 95,38 86,44 89,54 80,48 71,54 74,44 65,38 76,38" fill="#fdf0a6"/>
            `;
            break;
        case "wheel-sun":
            centerArt = `
                <circle cx="80" cy="80" r="34" fill="rgba(229,193,88,0.18)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <circle cx="80" cy="80" r="12" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
                <line x1="80" y1="36" x2="80" y2="124" stroke="url(#goldGrad)" stroke-width="2"/>
                <line x1="36" y1="80" x2="124" y2="80" stroke="url(#goldGrad)" stroke-width="2"/>
                <line x1="49" y1="49" x2="111" y2="111" stroke="url(#goldGrad)" stroke-width="2"/>
                <line x1="111" y1="49" x2="49" y2="111" stroke="url(#goldGrad)" stroke-width="2"/>
            `;
            break;
        case "sun-bell":
            centerArt = `
                <path d="M56,96 L104,96 L96,62 C96,48 64,48 64,62 Z" fill="rgba(229,193,88,0.22)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <circle cx="80" cy="104" r="7" fill="#fdf0a6"/>
                <circle cx="80" cy="44" r="5" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
            `;
            break;
        case "twin-moons":
            centerArt = `
                <path d="M72,46 A30,30 0 1,0 72,114 A22,22 0 1,1 72,46 Z" fill="rgba(184,107,255,0.25)" stroke="url(#goldGrad)" stroke-width="2"/>
                <path d="M88,46 A30,30 0 1,1 88,114 A22,22 0 1,0 88,46 Z" fill="rgba(92,225,230,0.2)" stroke="url(#goldGrad)" stroke-width="2"/>
            `;
            break;
        case "lightning-coin":
            centerArt = `
                <circle cx="80" cy="80" r="32" fill="rgba(229,193,88,0.16)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <polygon points="86,44 62,82 78,82 72,116 100,76 82,76" fill="#fdf0a6" stroke="url(#goldGrad)" stroke-width="1.5"/>
            `;
            break;
        case "crescent-cloud":
            centerArt = `
                <path d="M90,44 A34,34 0 1,0 116,98 A26,26 0 1,1 90,44 Z" fill="rgba(229,193,88,0.25)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <circle cx="62" cy="58" r="3" fill="#fdf0a6"/>
                <circle cx="98" cy="68" r="2.5" fill="#fdf0a6"/>
            `;
            break;
        case "crown-star":
            centerArt = `
                <polygon points="44,98 52,56 80,76 108,56 116,98" fill="rgba(255,110,199,0.22)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <line x1="44" y1="106" x2="116" y2="106" stroke="url(#goldGrad)" stroke-width="3"/>
                <circle cx="52" cy="48" r="4" fill="#fdf0a6"/>
                <circle cx="80" cy="42" r="5" fill="#fdf0a6"/>
                <circle cx="108" cy="48" r="4" fill="#fdf0a6"/>
            `;
            break;
        default:
            centerArt = `
                <line x1="80" y1="38" x2="80" y2="120" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <line x1="46" y1="62" x2="114" y2="62" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <polygon points="46,62 36,90 56,90" fill="rgba(229,193,88,0.2)" stroke="url(#goldGrad)" stroke-width="2"/>
                <polygon points="114,62 104,90 124,90" fill="rgba(229,193,88,0.2)" stroke="url(#goldGrad)" stroke-width="2"/>
            `;
            break;
    }

    return `<svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        ${commonDefs}
        ${outerRing}
        ${centerArt}
    </svg>`;
}

// ============================================================================
// Initialization & LocalStorage Custom Cards
// ============================================================================
function loadAllCards() {
    let customCards = [];
    try {
        const saved = localStorage.getItem("doosibara_custom_cards");
        if (saved) customCards = JSON.parse(saved);
    } catch (e) {
        customCards = [];
    }
    state.cards = [...DEFAULT_TAROT_CARDS, ...customCards];
}

function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// ============================================================================
// Render Tarot Deck Spread
// ============================================================================
function shuffleAndDeal(animate = true) {
    sound.playShuffle();
    state.selectedIndices = [];
    state.shuffledDeck = shuffleArray(state.cards);

    const readingStage = document.getElementById("readingStage");
    readingStage.classList.remove("visible");

    const grid = document.getElementById("tarotDeckGrid");
    grid.innerHTML = "";

    const deckCount = Math.min(12, state.shuffledDeck.length);
    for (let i = 0; i < deckCount; i++) {
        const slot = document.createElement("div");
        slot.className = `deck-card-slot ${animate ? "shuffling" : ""}`;
        slot.style.animationDelay = `${i * 0.035}s`;
        slot.dataset.index = i;

        slot.innerHTML = `
            <div class="card-back-design">
                <div class="card-back-inner">
                    <svg viewBox="0 0 80 80" width="54" height="54">
                        <circle cx="40" cy="40" r="30" fill="none" stroke="#e5c158" stroke-width="1.5" stroke-dasharray="3 3"/>
                        <polygon points="40,12 47,32 68,32 51,44 57,64 40,52 23,64 29,44 12,32 33,32" fill="rgba(229,193,88,0.2)" stroke="#e5c158" stroke-width="1.2"/>
                        <circle cx="40" cy="40" r="6" fill="#fdf0a6"/>
                    </svg>
                    <span class="card-back-number">DOOSI • ${i + 1}</span>
                </div>
            </div>
        `;

        slot.addEventListener("click", () => handleCardPick(i, slot));
        grid.appendChild(slot);
    }

    updateOraclePrompt();
}

function updateOraclePrompt() {
    const promptEl = document.getElementById("oraclePromptText");
    const friendName = document.getElementById("friendNameInput").value.trim();
    const prefix = friendName ? `ตั้งจิตถึง "${friendName}" แล้ว` : "ตั้งจิตอธิษฐาน แล้ว";

    if (state.spreadMode === 1) {
        promptEl.textContent = `${prefix}กดเลือกไพ่ทาโรต์ 1 ใบด้วยตัวเอง เพื่อรับคำอวยพรและคำทำนายแห่งปี 2026`;
    } else {
        const remaining = 3 - state.selectedIndices.length;
        promptEl.textContent = remaining > 0
            ? `${prefix}เลือกไพ่ให้ครบ 3 ใบ (อดีต • ปัจจุบัน • อนาคต) — เหลืออีก ${remaining} ใบ`
            : `เปิดไพ่ครบ 3 ใบแล้ว! เลื่อนลงเพื่ออ่านคำทำนายได้เลย`;
    }
}

function handleCardPick(index, slotEl) {
    if (state.selectedIndices.includes(index)) return;
    if (state.selectedIndices.length >= state.spreadMode) return;

    sound.playFlip();
    state.selectedIndices.push(index);
    slotEl.classList.add("selected");

    updateOraclePrompt();

    if (state.selectedIndices.length === state.spreadMode) {
        revealReading();
    }
}

// ============================================================================
// Reveal Reading (1-Card or 3-Card)
// ============================================================================
function getFocusLabel() {
    const select = document.getElementById("focusCategorySelect");
    const map = {
        daily: "🔮 ดวงรวม & คำอวยพรประจำวัน",
        love: "💘 ดวงความรัก (คนคุยหรือคนคุก)",
        money: "💸 ดวงการเงิน & การงาน (รวยกี่โมง)",
        roast: "🔥 โหมดเผาเพื่อนด้วยความรัก"
    };
    return map[select.value] || map.daily;
}

function getToneBadgeHtml(tone) {
    if (tone === "positive") {
        return `<span class="tone-badge tone-positive">🟢 ไพ่พลังบวก (สายอวย)</span>`;
    }
    if (tone === "negative") {
        return `<span class="tone-badge tone-negative">🔴 ไพ่พลังลบ (สายแกง)</span>`;
    }
    return `<span class="tone-badge tone-neutral">🟡 ไพ่พลังกลาง (เตือนสติ)</span>`;
}

function getFocusFlavorAddOn(card, category) {
    if (card.tone === "negative") {
        if (category === "love") {
            return `💘 มิติความรัก: อาการหนักระดับไพ่ "${card.phrase}" อย่าเพิ่งไปคาดหวังความโรแมนติก เอาสติตัวเองให้รอดก่อน!`;
        }
        if (category === "money") {
            return `💸 มิติการเงิน & งาน: สัญญาณเตือนภัยจากไพ่ "${card.phrase}" ล็อกแอปธนาคารด่วนก่อนจะเหลือแต่ชื่อ!`;
        }
        return `🔥 คำเตือนจากสำนัก: ได้ไพ่ "${card.phrase}" แปลว่าช่วงนี้ดวงแกงแรงมาก อยู่นิ่งๆ ไว้จะปลอดภัยที่สุด!`;
    }
    if (category === "love") {
        return `💘 มิติความรัก: เสน่ห์ของคุณมาในรูปแบบ "${card.phrase}" คนที่เข้ามาช่วงนี้จะแพ้ทางความเป็นธรรมชาติและความกวนของคุณแบบถอนตัวไม่ขึ้น`;
    }
    if (category === "money") {
        return `💸 มิติการเงิน & งาน: พลังไพ่ "${card.phrase}" บอกว่ายิ่งพูดจาฉะฉานและกล้าตัดสินใจ เงินพิเศษและโอกาสเรื่องงานจะวิ่งเข้าหาไวขึ้น`;
    }
    if (category === "roast") {
        return `🔥 สารลับฝากถึงเพื่อน: ไพ่ใบนี้ไม่ได้ออกมามั่วๆ แต่จักรวาลคัดมาเพื่อสะท้อนตัวตนระดับ "${card.phrase}" ของแกโดยเฉพาะ ยอมรับความจริงซะ!`;
    }
    return `✨ พลังงานเสริมประจำวัน: ท่องคำว่า "${card.phrase}" หน้ากระจก 1 จบก่อนออกจากบ้าน จะช่วยปลุกออร่าความมั่นใจเต็มร้อย!`;
}

function revealReading() {
    const readingStage = document.getElementById("readingStage");
    const friendName = document.getElementById("friendNameInput").value.trim() || "ผู้รับคำทำนายผู้ทรงเกียรติ";
    const category = document.getElementById("focusCategorySelect").value;
    const focusLabel = getFocusLabel();

    const pickedCards = state.selectedIndices.map(idx => state.shuffledDeck[idx]);
    state.lastRevealedCards = pickedCards;

    if (state.spreadMode === 1) {
        const card = pickedCards[0];
        const addOn = getFocusFlavorAddOn(card, category);

        readingStage.innerHTML = `
            <div class="single-reading-layout">
                <div class="tarot-card-showcase">
                    <div class="tarot-card-front">
                        <div class="tarot-card-frame">
                            <div class="tarot-roman">${card.roman}</div>
                            <div class="tarot-art-box">
                                <div class="tarot-svg-wrap">${getTarotSvg(card.svgIcon)}</div>
                                <span class="tarot-Power-tag">✦ ${card.powerTag}</span>
                            </div>
                            <div class="tarot-title-plate">
                                <div class="tarot-phrase-main">“${card.phrase}”</div>
                                <div class="tarot-phrase-eng">${card.engTitle}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="prophecy-content">
                    <div class="prophecy-header">
                        <div class="recipient-badge">🎴 คำทำนายแด่: <strong>${escapeHtml(friendName)}</strong> • ${focusLabel}</div>
                        <h2 class="prophecy-card-title">ไพ่ “${card.phrase}” ${getToneBadgeHtml(card.tone)}</h2>
                        <div class="prophecy-card-subtitle">${card.roman} — ${card.engTitle}</div>
                    </div>

                    <div class="prophecy-box funny-lore">
                        <div class="box-label">😂 คำจำกัดความจากจักรวาล (Meme Lore)</div>
                        <p>${card.funnyMeaning}</p>
                    </div>

                    <div class="prophecy-box real-prediction">
                        <div class="box-label">🔮 คำทำนายที่พอเป็นไปได้ (Prophecy)</div>
                        <p>${card.realisticProphecy}</p>
                        <p style="margin-top:0.55rem; color: var(--gold-light); font-size:0.92rem;">${addOn}</p>
                    </div>

                    <div class="prophecy-box blessing-box">
                        <div class="box-label">✨ คำอวยพรประจำการ์ด (Sacred Blessing)</div>
                        <p><strong>“${card.blessing}”</strong></p>
                    </div>

                    <div class="lucky-stats-grid">
                        <div class="lucky-stat-card">
                            <span class="lucky-stat-label">🎨 สีมงคลเสริมความจึ้ง</span>
                            <span class="lucky-stat-value">${card.luckyColor}</span>
                        </div>
                        <div class="lucky-stat-card">
                            <span class="lucky-stat-label">🧿 ไอเทมนำโชค</span>
                            <span class="lucky-stat-value">${card.luckyItem}</span>
                        </div>
                        <div class="lucky-stat-card">
                            <span class="lucky-stat-label">🔢 เลขมงคล 2026</span>
                            <span class="lucky-stat-value">${card.luckyNumber}</span>
                        </div>
                    </div>

                    <div class="reading-actions-bar">
                        <button class="btn-gold" onclick="downloadCardImage()">
                            📸 บันทึกรูปการ์ดส่งให้เพื่อน
                        </button>
                        <button class="btn-outline-gold" onclick="copyReadingText()">
                            📋 คัดลอกคำทำนายไปแชร์
                        </button>
                        <button class="btn-pill" onclick="shuffleAndDeal(true)">
                            🔄 สับไพ่เปิดใหม่
                        </button>
                    </div>
                </div>
            </div>
        `;
    } else {
        const positions = ["⏪ อดีตที่ผ่านมา", "⚡ ปัจจุบันที่เป็นอยู่", "⏩ อนาคตที่กำลังจะมา"];
        const cardsHtml = pickedCards.map((card, i) => `
            <div class="three-card-item">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.4rem;">
                    <span class="position-pill">${positions[i]}</span>
                    ${getToneBadgeHtml(card.tone)}
                </div>
                <div class="tarot-card-showcase" style="max-width: 230px;">
                    <div class="tarot-card-front">
                        <div class="tarot-card-frame">
                            <div class="tarot-roman">${card.roman}</div>
                            <div class="tarot-art-box">
                                <div class="tarot-svg-wrap" style="width:115px;height:115px;">${getTarotSvg(card.svgIcon)}</div>
                                <span class="tarot-Power-tag">${card.powerTag}</span>
                            </div>
                            <div class="tarot-title-plate">
                                <div class="tarot-phrase-main" style="font-size:1.15rem;">“${card.phrase}”</div>
                                <div class="tarot-phrase-eng">${card.engTitle}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="prophecy-box funny-lore">
                    <div class="box-label">😂 ความหมายหน้าไพ่</div>
                    <p>${card.funnyMeaning}</p>
                </div>
                <div class="prophecy-box real-prediction">
                    <div class="box-label">🔮 คำทำนาย</div>
                    <p>${card.realisticProphecy}</p>
                </div>
                <div class="prophecy-box blessing-box">
                    <div class="box-label">✨ คำอวยพร</div>
                    <p><strong>“${card.blessing}”</strong></p>
                </div>
            </div>
        `).join("");

        readingStage.innerHTML = `
            <div style="text-align:center; margin-bottom:1.25rem;">
                <div class="recipient-badge">🎴 เปิดไพ่ 3 กาลเวลาแด่: <strong>${escapeHtml(friendName)}</strong> • ${focusLabel}</div>
                <h2 class="prophecy-card-title">บันทึกชะตา 3 ใบจากสำนัก DooSi.BaRa</h2>
            </div>
            <div class="three-card-grid">
                ${cardsHtml}
            </div>
            <div class="reading-actions-bar" style="justify-content:center;">
                <button class="btn-gold" onclick="downloadCardImage()">
                    📸 บันทึกรูปการ์ดใบเด่นส่งให้เพื่อน
                </button>
                <button class="btn-outline-gold" onclick="copyReadingText()">
                    📋 คัดลอกผลทำนายทั้ง 3 ใบ
                </button>
                <button class="btn-pill" onclick="shuffleAndDeal(true)">
                    🔄 สับไพ่เปิดใหม่
                </button>
            </div>
        `;
    }

    readingStage.classList.add("visible");
    setTimeout(() => {
        readingStage.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
}

// ============================================================================
// Share, Copy & Download PNG Tarot Card
// ============================================================================
function copyReadingText() {
    if (!state.lastRevealedCards || !state.lastRevealedCards.length) return;
    const friendName = document.getElementById("friendNameInput").value.trim() || "เพื่อนรัก";

    let text = `🔮 สำนักไพ่ทาโรต์ DooSi.BaRa (ดูสิ.บาร่า) 2026\n`;
    text += `💌 คำทำนายและคำอวยพรแด่: ${friendName}\n\n`;

    if (state.lastRevealedCards.length === 1) {
        const c = state.lastRevealedCards[0];
        text += `🃏 ไพ่ที่ได้: “${c.phrase}” (${c.engTitle})\n`;
        text += `😂 คำนิยาม: ${c.funnyMeaning}\n`;
        text += `🌟 คำทำนาย: ${c.realisticProphecy}\n`;
        text += `✨ คำอวยพร: “${c.blessing}”\n`;
        text += `🎨 สีมงคล: ${c.luckyColor} | 🔢 เลขนำโชค: ${c.luckyNumber}\n`;
    } else {
        const labels = ["อดีต", "ปัจจุบัน", "อนาคต"];
        state.lastRevealedCards.forEach((c, idx) => {
            text += `[${labels[idx]}] ไพ่ “${c.phrase}” — ${c.blessing}\n`;
        });
    }

    text += `\n👉 มาเปิดการ์ดดูดวงขำๆ กันได้ที่: ${window.location.origin}${window.location.pathname}`;

    navigator.clipboard.writeText(text).then(() => {
        showToast("📋 คัดลอกคำทำนายเรียบร้อย! เอาไปวางแกล้งเพื่อนในแชทได้เลย");
    }).catch(() => {
        showToast("คัดลอกข้อความสำเร็จ!");
    });
}

function downloadCardImage() {
    if (!state.lastRevealedCards || !state.lastRevealedCards.length) return;
    const card = state.lastRevealedCards[0];
    const friendName = document.getElementById("friendNameInput").value.trim() || "เพื่อนผู้โชคดี";

    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 1320;
    const ctx = canvas.getContext("2d");

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 900, 1320);
    bgGrad.addColorStop(0, "#15092b");
    bgGrad.addColorStop(0.5, "#090414");
    bgGrad.addColorStop(1, "#241042");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 900, 1320);

    // Subtle radial glow
    const radGrad = ctx.createRadialGradient(450, 420, 40, 450, 420, 420);
    radGrad.addColorStop(0, "rgba(229, 193, 88, 0.22)");
    radGrad.addColorStop(1, "rgba(229, 193, 88, 0)");
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, 900, 1320);

    // Ornate Gold Borders
    ctx.strokeStyle = "#e5c158";
    ctx.lineWidth = 6;
    ctx.strokeRect(36, 36, 828, 1248);

    ctx.strokeStyle = "rgba(229, 193, 88, 0.45)";
    ctx.lineWidth = 2;
    ctx.strokeRect(54, 54, 792, 1212);

    // Header
    ctx.fillStyle = "#fdf0a6";
    ctx.font = "bold 34px 'Cinzel Decorative', Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("DOOSI.BARA • ดูสิ.บาร่า", 450, 115);

    ctx.fillStyle = "#bbaed6";
    ctx.font = "22px 'Prompt', sans-serif";
    ctx.fillText(`การ์ดอวยพรแห่งโชคชะตาแด่: ${friendName}`, 450, 158);

    // Roman numeral & Emblem Circle
    ctx.fillStyle = "#e5c158";
    ctx.font = "bold 24px Georgia, serif";
    ctx.fillText(card.roman, 450, 215);

    ctx.beginPath();
    ctx.arc(450, 355, 105, 0, Math.PI * 2);
    ctx.strokeStyle = "#e5c158";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "#fdf0a6";
    ctx.font = "bold 60px 'Prompt', sans-serif";
    ctx.fillText(`“${card.phrase}”`, 450, 372);

    ctx.fillStyle = "#ff9de2";
    ctx.font = "italic 24px Georgia, serif";
    ctx.fillText(`${card.engTitle} • ${card.powerTag}`, 450, 505);

    // Divider line
    ctx.beginPath();
    ctx.moveTo(140, 540);
    ctx.lineTo(760, 540);
    ctx.strokeStyle = "rgba(229, 193, 88, 0.4)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text blocks helper
    ctx.textAlign = "left";

    function drawWrappedBlock(title, body, startY, titleColor) {
        ctx.fillStyle = titleColor;
        ctx.font = "bold 25px 'Prompt', sans-serif";
        ctx.fillText(title, 95, startY);

        ctx.fillStyle = "#f8f3ff";
        ctx.font = "23px 'Prompt', sans-serif";
        const words = body.split(" ");
        let lines = [];
        // Thai text wrap by character chunks if no spaces
        const chars = Array.from(body);
        let currentLine = "";
        for (let ch of chars) {
            const testLine = currentLine + ch;
            if (ctx.measureText(testLine).width > 710) {
                lines.push(currentLine);
                currentLine = ch;
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) lines.push(currentLine);

        let y = startY + 38;
        lines.forEach(line => {
            ctx.fillText(line, 95, y);
            y += 36;
        });
        return y + 26;
    }

    let curY = 595;
    curY = drawWrappedBlock("😂 คำจำกัดความจากจักรวาล:", card.funnyMeaning, curY, "#ff9de2");
    curY = drawWrappedBlock("🔮 คำทำนายที่พอเป็นไปได้:", card.realisticProphecy, curY, "#5ce1e6");
    curY = drawWrappedBlock("✨ คำอวยพรประจำการ์ด:", `“${card.blessing}”`, curY, "#fdf0a6");

    // Footer Lucky stats
    ctx.textAlign = "center";
    ctx.fillStyle = "#e5c158";
    ctx.font = "22px 'Prompt', sans-serif";
    ctx.fillText(`🎨 สีมงคล: ${card.luckyColor}   |   🔢 เลขมงคล: ${card.luckyNumber}`, 450, 1215);

    ctx.fillStyle = "#bbaed6";
    ctx.font = "18px 'Prompt', sans-serif";
    ctx.fillText("DooSi.BaRa — สำนักไพ่ทาโรต์สายมีม 2026", 450, 1252);

    const link = document.createElement("a");
    link.download = `DooSiBaRa-${card.id}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    showToast("📸 บันทึกรูปการ์ดทาโรต์เรียบร้อย! ส่งให้เพื่อนได้เลย");
}

// ============================================================================
// Full Deck Gallery & Custom Card Creator Modal
// ============================================================================
function openGalleryModal() {
    const modal = document.getElementById("galleryModal");
    renderGalleryList();
    modal.classList.add("open");
}

function renderGalleryList() {
    const container = document.getElementById("galleryGridContainer");
    container.innerHTML = state.cards.map(card => `
        <div class="gallery-mini-card" onclick="previewSpecificCard('${card.id}')">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.25rem; margin-bottom:0.25rem;">
                <span style="font-size:0.68rem; color:var(--gold-primary); font-family:'Cinzel Decorative',serif;">${card.roman.split('•')[0]}</span>
                ${getToneBadgeHtml(card.tone)}
            </div>
            <h4>“${escapeHtml(card.phrase)}”</h4>
            <p>${escapeHtml(card.funnyMeaning)}</p>
        </div>
    `).join("");
}

function previewSpecificCard(cardId) {
    const idx = state.shuffledDeck.findIndex(c => c.id === cardId);
    const cardObj = state.cards.find(c => c.id === cardId);
    if (!cardObj) return;

    document.getElementById("galleryModal").classList.remove("open");
    state.spreadMode = 1;
    updateModeTabUI();

    if (idx !== -1) {
        state.selectedIndices = [idx];
    } else {
        state.shuffledDeck[0] = cardObj;
        state.selectedIndices = [0];
    }
    sound.playFlip();
    revealReading();
}

function handleCreateCustomCard(e) {
    e.preventDefault();
    const phrase = document.getElementById("customPhrase").value.trim();
    const funny = document.getElementById("customFunny").value.trim();
    const prophecy = document.getElementById("customProphecy").value.trim();
    const blessing = document.getElementById("customBlessing").value.trim();

    if (!phrase || !funny || !prophecy) return;

    const newCard = {
        id: "custom_" + Date.now(),
        roman: `XVI+ • THE CUSTOM MEME`,
        phrase,
        engTitle: "The Secret Friend Lore",
        powerTag: "ไพ่ลับสร้างเอง",
        svgIcon: "crown-star",
        funnyMeaning: funny,
        realisticProphecy: prophecy,
        blessing: blessing || `ขอให้พลังแห่ง “${phrase}” จงสถิตอยู่กับเจ้า!`,
        luckyColor: "สีอะไรก็ได้ที่เพื่อนชอบ",
        luckyItem: "เพื่อนแท้ที่ส่งการ์ดใบนี้ให้",
        luckyNumber: "99, 26"
    };

    try {
        const existing = JSON.parse(localStorage.getItem("doosibara_custom_cards") || "[]");
        existing.push(newCard);
        localStorage.setItem("doosibara_custom_cards", JSON.stringify(existing));
    } catch (err) {
        // ignore storage quota errors
    }

    loadAllCards();
    renderGalleryList();
    shuffleAndDeal(false);

    e.target.reset();
    showToast(`✨ เพิ่มไพ่ “${phrase}” เข้าสำรับเรียบร้อย!`);
}

// ============================================================================
// Starfield Background Animation
// ============================================================================
function initStarfield() {
    const canvas = document.getElementById("starfield");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height, stars = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        stars = Array.from({ length: 95 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.8 + 0.4,
            alpha: Math.random(),
            speed: (Math.random() * 0.015 + 0.004) * (Math.random() < 0.5 ? 1 : -1),
            gold: Math.random() < 0.35
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        for (const s of stars) {
            s.alpha += s.speed;
            if (s.alpha <= 0.15 || s.alpha >= 0.95) s.speed *= -1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.gold
                ? `rgba(243, 212, 112, ${s.alpha})`
                : `rgba(235, 225, 255, ${s.alpha})`;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    draw();
}

// ============================================================================
// Helpers & Event Listeners
// ============================================================================
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

let toastTimer = null;
function showToast(msg) {
    const toast = document.getElementById("mysticToast");
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3200);
}

function updateModeTabUI() {
    document.querySelectorAll(".mode-tab").forEach(btn => {
        const mode = Number(btn.dataset.mode);
        btn.classList.toggle("active", mode === state.spreadMode);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initStarfield();
    loadAllCards();
    shuffleAndDeal(true);

    // Spread mode tabs (1 card vs 3 cards)
    document.querySelectorAll(".mode-tab").forEach(btn => {
        btn.addEventListener("click", () => {
            state.spreadMode = Number(btn.dataset.mode);
            updateModeTabUI();
            shuffleAndDeal(true);
        });
    });

    // Shuffle button
    document.getElementById("btnShuffleDeck").addEventListener("click", () => {
        shuffleAndDeal(true);
        showToast("🔀 สับไพ่แห่งโชคชะตาใหม่เรียบร้อย!");
    });

    // Instant Random Draw button
    document.getElementById("btnQuickDraw").addEventListener("click", () => {
        state.selectedIndices = [];
        const slots = document.querySelectorAll(".deck-card-slot");
        const indices = shuffleArray(Array.from({ length: slots.length }, (_, i) => i)).slice(0, state.spreadMode);
        indices.forEach(idx => handleCardPick(idx, slots[idx]));
    });

    // Friend name live prompt update
    document.getElementById("friendNameInput").addEventListener("input", updateOraclePrompt);

    // Sound toggle
    const soundBtn = document.getElementById("btnToggleSound");
    soundBtn.addEventListener("click", () => {
        state.soundEnabled = !state.soundEnabled;
        soundBtn.textContent = state.soundEnabled ? "🔊 เสียงมนตรา: เปิด" : "🔇 เสียงมนตรา: ปิด";
    });

    // Gallery modal events
    document.getElementById("btnOpenGallery").addEventListener("click", openGalleryModal);
    document.getElementById("customCardForm").addEventListener("submit", handleCreateCustomCard);

    // Close modals on backdrop click
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
        backdrop.addEventListener("click", (e) => {
            if (e.target === backdrop) backdrop.classList.remove("open");
        });
    });
});

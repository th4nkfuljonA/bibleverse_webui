/**
 * Bible Verses Database
 * @fileoverview Collection of Bible verses with multiple translations
 * All translations are in the public domain: KJV, ASV, WEB
 */

// Categories for better organization
const VERSE_CATEGORIES = {
  'encouragement': ['John 3:16', 'Philippians 4:13', 'Jeremiah 29:11', 'Romans 8:28', 'Isaiah 41:10'],
  'faith': ['Hebrews 11:1', '2 Corinthians 5:7', 'Galatians 2:20'],
  'peace': ['Psalm 23:1', 'Psalm 46:1', 'Matthew 11:28', '1 Peter 5:7'],
  'guidance': ['Proverbs 3:5-6', 'Matthew 6:33', 'Romans 12:2', 'Joshua 1:9'],
  'salvation': ['John 14:6', 'Ephesians 2:8-9', 'John 1:1'],
  'hope': ['Lamentations 3:22-23']
};

// Search functionality
function searchVerses(query, translation = 'KJV') {
  if (!query || typeof query !== 'string') return [];
  
  const searchTerm = query.toLowerCase();
  return VERSES.filter(verse => 
    verse.ref.toLowerCase().includes(searchTerm) ||
    (verse[translation] && verse[translation].toLowerCase().includes(searchTerm))
  );
}

function getVersesByCategory(category) {
  if (!VERSE_CATEGORIES[category]) return [];
  
  return VERSES.filter(verse => 
    VERSE_CATEGORIES[category].includes(verse.ref)
  );
}

function getRandomVerse(translation = 'KJV') {
  const randomIndex = Math.floor(Math.random() * VERSES.length);
  return VERSES[randomIndex];
}

/* Public-domain translations included: KJV, ASV, WEB */
const VERSES = [
    {
      ref: "John 3:16",
      KJV: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      ASV: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth on him should not perish, but have eternal life.",
      WEB: "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life."
    },
    {
      ref: "Psalm 23:1",
      KJV: "The LORD is my shepherd; I shall not want.",
      ASV: "Jehovah is my shepherd; I shall not want.",
      WEB: "The LORD is my shepherd; I shall lack nothing."
    },
    {
      ref: "Philippians 4:13",
      KJV: "I can do all things through Christ which strengtheneth me.",
      ASV: "I can do all things in him that strengtheneth me.",
      WEB: "I can do all things through Christ who strengthens me."
    },
    {
      ref: "Jeremiah 29:11",
      KJV: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
      ASV: "For I know the thoughts that I think toward you, saith Jehovah, thoughts of peace, and not of evil, to give you hope in your latter end.",
      WEB: "For I know the thoughts that I think toward you,” says the LORD, “thoughts of peace, and not of evil, to give you hope and a future."
    },
    {
      ref: "Romans 8:28",
      KJV: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      ASV: "And we know that to them that love God all things work together for good, even to them that are called according to his purpose.",
      WEB: "We know that all things work together for good for those who love God, to those who are called according to his purpose."
    },
    {
      ref: "Proverbs 3:5-6",
      KJV: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
      ASV: "Trust in Jehovah with all thy heart, And lean not upon thine own understanding: In all thy ways acknowledge him, And he will direct thy paths.",
      WEB: "Trust in the LORD with all your heart, and don’t lean on your own understanding. In all your ways acknowledge him, and he will make your paths straight."
    },
    {
      ref: "Isaiah 41:10",
      KJV: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
      ASV: "Fear thou not, for I am with thee; be not dismayed, for I am thy God; I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
      WEB: "Don’t you be afraid, for I am with you. Don’t be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness."
    },
    {
      ref: "Matthew 6:33",
      KJV: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
      ASV: "But seek ye first his kingdom, and his righteousness; and all these things shall be added unto you.",
      WEB: "But seek first God’s Kingdom and his righteousness; and all these things will be given to you as well."
    },
    {
      ref: "Romans 12:2",
      KJV: "And be not conformed to this world: but be ye transformed by the renewing of your mind...",
      ASV: "And be not fashioned according to this world: but be ye transformed by the renewing of your mind...",
      WEB: "Don’t be conformed to this world, but be transformed by the renewing of your mind..."
    },
    {
      ref: "Joshua 1:9",
      KJV: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
      ASV: "Have not I commanded thee? Be strong and of good courage; be not affrighted, neither be thou dismayed: for Jehovah thy God is with thee whithersoever thou goest.",
      WEB: "Haven’t I commanded you? Be strong and courageous. Don’t be afraid. Don’t be dismayed, for the LORD your God is with you wherever you go."
    },
    {
      ref: "John 14:6",
      KJV: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
      ASV: "Jesus saith unto him, I am the way, and the truth, and the life: no one cometh unto the Father, but by me.",
      WEB: "Jesus said to him, “I am the way, the truth, and the life. No one comes to the Father, except through me.”"
    },
    {
      ref: "Psalm 46:1",
      KJV: "God is our refuge and strength, a very present help in trouble.",
      ASV: "God is our refuge and strength, A very present help in trouble.",
      WEB: "God is our refuge and strength, a very present help in trouble."
    },
    {
      ref: "1 Peter 5:7",
      KJV: "Casting all your care upon him; for he careth for you.",
      ASV: "Casting all your anxiety upon him, because he careth for you.",
      WEB: "Casting all your worries on him, because he cares for you."
    },
    {
      ref: "Matthew 11:28",
      KJV: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
      ASV: "Come unto me, all ye that labor and are heavy laden, and I will give you rest.",
      WEB: "Come to me, all you who labor and are heavily burdened, and I will give you rest."
    },
    {
      ref: "Ephesians 2:8-9",
      KJV: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
      ASV: "For by grace have ye been saved through faith; and that not of yourselves: it is the gift of God; not of works, that no man should glory.",
      WEB: "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, that no one would boast."
    },
    {
      ref: "Galatians 2:20",
      KJV: "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me...",
      ASV: "I have been crucified with Christ; and it is no longer I that live, but Christ liveth in me...",
      WEB: "I have been crucified with Christ, and it is no longer I who live, but Christ lives in me..."
    },
    {
      ref: "Lamentations 3:22-23",
      KJV: "It is of the LORD'S mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
      ASV: "It is of Jehovah’s lovingkindnesses that we are not consumed, because his compassions fail not. They are new every morning; great is thy faithfulness.",
      WEB: "It is because of the LORD’s loving kindnesses that we are not consumed, because his compassion doesn’t fail. They are new every morning; great is your faithfulness."
    },
    {
      ref: "Hebrews 11:1",
      KJV: "Now faith is the substance of things hoped for, the evidence of things not seen.",
      ASV: "Now faith is assurance of things hoped for, a conviction of things not seen.",
      WEB: "Now faith is assurance of things hoped for, proof of things not seen."
    },
    {
      ref: "2 Corinthians 5:7",
      KJV: "For we walk by faith, not by sight.",
      ASV: "For we walk by faith, not by sight.",
      WEB: "For we walk by faith, not by sight."
    },
    {
      ref: "John 1:1",
      KJV: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      ASV: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      WEB: "In the beginning was the Word, and the Word was with God, and the Word was God."
    },
    {
      ref: "Psalm 119:105",
      KJV: "Thy word is a lamp unto my feet, and a light unto my path.",
      ASV: "Thy word is a lamp unto my feet, and light unto my path.",
      WEB: "Your word is a lamp to my feet, and a light for my path."
    },
    {
      ref: "Isaiah 40:31",
      KJV: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
      ASV: "But they that wait for Jehovah shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; they shall walk, and not faint.",
      WEB: "But those who wait for the LORD will renew their strength. They will mount up with wings like eagles. They will run, and not be weary. They will walk, and not faint."
    },
    {
      ref: "1 Corinthians 13:4-5",
      KJV: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil.",
      ASV: "Love suffereth long, and is kind; love envieth not; love vaunteth not itself, is not puffed up, doth not behave itself unseemly, seeketh not its own, is not provoked, taketh not account of evil.",
      WEB: "Love is patient and is kind. Love doesn't envy. Love doesn't brag, is not proud, doesn't behave itself inappropriately, doesn't seek its own way, is not provoked, takes no account of evil."
    },
    {
      ref: "Proverbs 16:9",
      KJV: "A man's heart deviseth his way: but the LORD directeth his steps.",
      ASV: "A man's heart deviseth his way; But Jehovah directeth his steps.",
      WEB: "A man's heart plans his course, but the LORD directs his steps."
    },
    {
      ref: "Psalm 37:4",
      KJV: "Delight thyself also in the LORD; and he shall give thee the desires of thine heart.",
      ASV: "Delight thyself also in Jehovah; And he will give thee the desires of thy heart.",
      WEB: "Also delight yourself in the LORD, and he will give you the desires of your heart."
    },
    {
      ref: "Matthew 28:20",
      KJV: "Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.",
      ASV: "Teaching them to observe all things whatsoever I commanded you: and lo, I am with you always, even unto the end of the world.",
      WEB: "Teaching them to observe all things that I commanded you. Behold, I am with you always, even to the end of the age."
    },
    {
      ref: "2 Timothy 1:7",
      KJV: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
      ASV: "For God gave us not a spirit of fearfulness; but of power and love and discipline.",
      WEB: "For God didn't give us a spirit of fear, but of power, love, and self-control."
    }
  ];

// Export search functions and verses to global scope
window.searchVerses = searchVerses;
window.getVersesByCategory = getVersesByCategory;
window.getRandomVerse = getRandomVerse;
window.VERSE_CATEGORIES = Object.keys(VERSE_CATEGORIES);
window.VERSES = VERSES;
  
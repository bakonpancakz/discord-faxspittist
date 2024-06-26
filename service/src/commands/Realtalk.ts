import { InteractionResponseType } from "discord-interactions"
import { CacheTTL, ToInteractionResponse } from "../Utils"
import { FaxCommand } from "../typings"

const Realtalk: FaxCommand = {
    structure: {
        name: "realtalk",
        description: "🔊 Real Talk from the Goat"
    },
    command: async (int, env) => {
        
        // Fetch used item list
        let key = `usable_realtalk_${int.guild_id}`
        let usableList: Array<number> | null = await env.CFKV.get(key, 'json')
        if (!usableList || usableList.length === 0) {
            // Create new list of usable items
            usableList = []
            for (var x = 1; x <= Quotes.length; x++) usableList.push(x)
        }

        // Choose a Random Item
        const QuoteId = usableList[Math.floor(Math.random() * usableList.length)];
        const QuoteText = Quotes[QuoteId];

        // Update List
        usableList.splice(QuoteId, 1)
        env.CFKV.put(key, JSON.stringify(usableList), { expirationTtl: CacheTTL })

        // Respond to Interaction
        return ToInteractionResponse({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: QuoteText,
            }
        })
    },
}
export default Realtalk

const Quotes = [
    "Don't worry kiddo, one day someone is going to admire you for who you are. For the way you speak, the way you smile, the way you laugh at the smallest things. Trust me, it will happen. For now just breathe and enjoy life.",
    "There is so much to look foward to, please hang in there friend.",
    "Shout out to the cool, kind, and good-looking human being reading this! YOU are loved and deserve to be loved, just the way you are. Keep smiling.",
    "Imagine how much stuff you could avoid if you knew someone's true intentions from the start.",
    "Hey friend, its okay to talk about your problems. It does not make you weak at all. Yes, it makes you vulnerable, but it will make you stronger.",
    "Stop imagining fake scenarios and hurting your own feelings.",
    "Stop and think about all the people you secretly admired. All the people who you've found attractive, but never said a word to. All the people you've had a temporarily crush on while riding public transportation. All the people you've dreamt of and thought of early in the morning Now take a moment a realize, you've been this person for many people, and you have no idea.",
    "Its crazy how you're over here doubting yourself while so many people are afraid of your potiential.",
    "The impact you make on others is bigger than you think. Someone laughs every time they think of that funny thing you said. Someone smiles when they think of that compliment you gave them. Someone secretly admires you. Someone appreciates the love and support you give them. You're not insignificant in any way. Your existence makes a positive difference whether you see it or not.",
    "No matter how much you miss a toxic person, please don't contact them. They're not worth your time, you'll just be sad again. We both know you deserve nothing but happiness. You don't ever need to feel drained and exhausted over someone.",
    "Learn to get back on track. When things go wrong, it don't really mean you've failed. It's normal to have days where you mess up, skip a work out, eat badly or ruin a perfect routine. and that's okay! It's all about being strong enough to forgive yourself and know that no matter how far you've gone in the wrong direction, you'll always have the chance to turn it around.",
    "Its okay if you thought you were over it but it hits you all over again. Its okay to fall apart even after you thought you had it under control. You are not weak. Healing is messy. There is no timeline for healing.",
    "If you notice yourself giving more energy than you recieve, step back.",
    "Hey friend, I hope that one day you feel secure in your mental health, and if not secure at least hopeful and confident that you're making the right decisions for yourself.",
    "I hope this time, when you notice the red flags, you don't ignore them. I hope this time when you see the lack of effort, you don't force it, you pick up and go. I really hope you save yourself before you even get hurt.",
    "Always remember that you can have the worst days of your life and a few weeks later you can have the best days of your life. Keep pushing friend.",
    "Are you really losing friends or are you just losing the people who was never genuine in the first place?",
    "The ones with the realest and kindest hearts get treated the worst but we will always win at the end, I promise you that.",
    "Dont forget, you've survived 100% of your bad days.",
    "Check yourself. Sometimes you are the toxic person. Sometimes you are the mean, negative person you're trying to push away. Sometimes the problem is you but that doesn't make you less worthy. Keep growing, keep checking on yourself and motivating yourself. Mistakes are opportunities. Face them, grow from them and move on.",
    "Do yourself a favor and take mixed signals as a no.",
    "Before your head hits the pillow tonight, remind yourself that you've done a good job. Be patient with yourself, and remember that big things are achieved not all at once, but one day at a time.",
    "You spend most of your life inside your head. So make it a nice place to be.",
    "If you have time to feel like crap, complain and check social media, then you have the time to meditate, write out how you feel, create a list of goals, make a list of things you are grateful for and better yourself.",
    "I may not know you but im rooting/cheering for you. I really hope that you live a long and good life filled with more love and good times than you can ever imagine.",
    "Stop real quick and thank yourself for how far you've come! It hasn't been easy.",
    "If you haven't heard it in a while, I want to remind you that im so incredibly proud of you kiddo.",
    "It's okay kiddo, you don't have to get it right every day.",
    "You can't force anybody to see that you are a blessing, just gotta let them miss out.",
    "One day, you are going to have everything you prayed for.",
    "Don't put so much time trying to be more physically appealing to find love. Remember the importance of being mentally attractive. Things like educating yourself, addressing your recurring toxic thoughts, dealing with your insecurities and learning to be happy on your own makes you attractive.",
    "You're getting distracted again kiddo, stay focused.",
    "You are replacable and so are they. Let those crazy thoughts go away and realize they chose you because of how special you are.",
    "Make sure you work on things that people can't take away from you. Things like your character, your personality, your honesty, your entire being.",
    "You deserve to be loved without having to hide the parts of yourself that you think are unlovable.",
    "You are beautiful You're just hard on yourself sometimes.",
    "Everything heals. Your body heals. Your heart heals. The mind heals. Wounds heals. Your soul repairs itself. Your happiness is always going to come back. Bad times don't last long.",
    "The point is not to become a \"mean cold-hearted person\". It's more about becoming unbothered by things, accepting things for what it is, being content, and staying focused.",
    "In order to be successful at anything , you dont have to be different. You simply have to be what most people aren't: consistent.",
    "You're not giving yourself enough credit kiddo, for overcoming the tough things and getting better. Like you made it this far. You deserve to celebrate how strong you are.",
    "Give yourself some credit, you made it through the days you thought you couldn't",
    "It costs $0.00 to remind someone they aren't alone in this world.",
    "If you are sad or lonely just remember there are billions of cells in your body and all they give a dam about is you.",
    "Not everyone you want in your life wants you in theirs, so stop trying to force someone to stay when they couldn't care less if you're around or not.",
    " This is your time to become who you want to be. This is your time to do things you love. This is your time to dedicate yourself to anything you think its worth living for.",
    "Would you like you, if you met you?",
    "It takes time to love yourself. Don't feel bad if you can't do it yet. You'll be able to soon. I promise",
    "You deserve to rest without feeling guilty about it.",
    "Dont worry friend, you will get better. Maybe not today, but someday.",
    "Please be yourself, even if you're crazy. Stop worrying about people with no personality judging you.",
    "Up your levels of self care and watch how much less you care about what isn't for you.",
    "You deserve that same love that you keep giving to everyone else.",
    "Actions prove who someone is, words just prove who they want to be.",
    "Replacing \"why is this happening to me\" with \"what is this trying to teach me\" is a game changer",
    "I just want to let you know that you are allowed to get up one day & decide to change who you are. You can choose to dress differently, change hairstyles, be more outspoken, say hi to new people, boost your confidence. You're not obligated to stay the way others view you.",
    "Even if you go for it and it doesn't work out, you still took a W. You had the guts to head straight into something that seemed so scary. That type of bravery takes you very far.",
    "Its your job to keep YOURSELF happy. Never rely on anyone else to do that for you.",
    "Self love will save you every single time.",
    "To all my people with good hearts, one day you'll get what you deserve",
    "Reset. Restart. Refocus as many times as you need to. Just dont give up!",
    "You are either as beautiful or as ugly as you believe you are. Only YOU can define your beauty. Thats not a power anyone can have over you.",
    "You can leave a toxic relationship/friendship but if you don't heal what attracted you to them, youll eventually face the same consequence. The same toxic traits but in a different person.",
    "You are important and special and loved even when your mind tells you you're not.",
    "Dont ever forget to remind people who you are just incase they get a little bit too comfortable.",
    "You are so used to your own looks, you dont know how beautiful you look to a stranger.",
    "Don't give up, kiddo. There's a future version of youself whos proud of how strong you are.",
    "Go surround yourself with people who bring out the best in you.",
    "One day you'll back and you'll be proud of yourself.",
    "Sometimes you need to take a step back and realize the world is too beautiful to waste your time being angry or sad when you could be enjoying what life has to offer.",
    "Ever just wanted to burst into tears because you've been holding in so much? Its okay to let it out. You're human. It will get better friend.",
    "You have to be responsible for your emotional intelligence. It's no longer about who hurt you or what made you this way, it's about what YOU can do to fix YOUR problem. Playing the blame game will leave you stuck and sad. Don't do it to yourself.",
    "Deep down you know exactly what you're capable of. There's even moments where you get a glimpse of all the potential you have. You can get there. You just have to be willing to sacrifice the habits, things, and situations that are standing in the way of your success.",
    "Everything will work in your favor all of a sudden and you will be thankful that you didn't give up. Blessings are coming believe that.",
    "Everyday, you continue. You wake up and conquer the day. You accomplish so many things, big or small. You keep pushing through. The dreaded weeks, school, family, whatever it may be. You're doing it.",
    "Неy, you are not behind in life. There's no timetable that we all must follow. 7 billion people cant do everything in the same order. Its never too early and its never too late. Stop beating yourself up about where you are now. At the end of the day its your schedule and everything is right on time.",
    "Hey I know your trying real hard to silently recover And i want you to know Im proud of you and every step you take. Your doing great.",
    "Whenever you think you have nothing left just remind yourself that you still have your favorite song, more chances, new beginnings, nice clothes, warm bed and yourself.",
    "In order to love who you are, you can not hate the experiences that shaped you."
]

import React, { useState, useEffect } from 'react';

export const question_and_answer_array = [
                                           {
                                             question: "How does the interaction between ecosystems and human health impact society?",
                                             options: [
                                               { label: "Ecosystems provide services like pollination, crops, and cultural value that contribute to human well-being.", value: "correct" },
                                               { label: "Ecosystems have no significant effect on human health and economic value.", value: "wrong1" },
                                               { label: "Climate change has no impact on ecosystem services.", value: "wrong2" },
                                               { label: "Human activities and pollution do not alter ecosystems in unpredictable ways.", value: "wrong3" }
                                             ]
                                           },
                                           {
                                             question: "What is a key factor contributing to the emergence and spread of zoonotic diseases like Lassa fever?",
                                             options: [
                                               { label: "The presence of specific host species in particular geographic regions", value: "correct" },
                                               { label: "The complete absence of human interaction with wildlife", value: "wrong1" },
                                               { label: "The elimination of agricultural practices in affected areas", value: "wrong2" },
                                               { label: "The inability of viruses to adapt to new host species", value: "wrong3" }
                                             ]
                                           },
                                           {
                                             question: "What was a key advantage of the mechanistic model over the statistical model in predicting Lassa fever outbreaks?",
                                             options: [
                                               { label: "It relied solely on hospital-reported cases", value: "wrong1" },
                                               { label: "It incorporated real-world parameters such as human population, host suitability, and contact rates", value: "correct" },
                                               { label: "It ignored environmental factors like rainfall and agriculture", value: "wrong2" },
                                               { label: "It was based only on past outbreak observations without predictive capabilities", value: "wrong3" }
                                             ]
                                           },
                                           {
                                             question: "What is a key challenge in predicting disease outbreaks using environmental and epidemiological models?",
                                             options: [
                                               { label: "The models cannot incorporate real-world data", value: "wrong1" },
                                               { label: "The interaction between landscape changes and disease spillover is not well understood", value: "correct" },
                                               { label: "Only human-to-human transmission is considered in predictive models", value: "wrong2" },
                                               { label: "Disease outbreaks are completely random and cannot be modeled", value: "wrong3" }
                                             ]
                                           },
                                           {
                                             question: "How can disease modeling inform decision-making in urban development and economic planning?",
                                             options: [
                                               { label: "By predicting the exact time and location of future outbreaks with certainty", value: "wrong1" },
                                               { label: "By helping to understand trade-offs between development benefits and potential health risks", value: "correct" },
                                               { label: "By focusing only on human-to-human transmission without considering environmental factors", value: "wrong2" },
                                               { label: "By preventing all zoonotic disease outbreaks through land-use restrictions", value: "wrong3" }
                                             ]
                                           }
                                         ];